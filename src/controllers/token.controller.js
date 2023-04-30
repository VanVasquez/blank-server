const model = require('../models');
const jwt = require('jsonwebtoken');
const { generateAccessToken } = require('../token');
module.exports = {
  Refresh: async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.status(401);

    const refreshToken = cookies.jwt;
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const user = await model.User.findOne({ username: decoded.username });
    if (!user) {
      return res.status(403).json({ message: 'account not found' });
    }
    const accessToken = generateAccessToken(user);
    res.status(200).json({ user: user.username, accessToken, name: user.name });
  },
};
