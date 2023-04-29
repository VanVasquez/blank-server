const jwt = require("jsonwebtoken");
module.exports = {
  generateAccessToken: (user) => {
    return jwt.sign(
      {
        UserInfo: {
          username: user.username,
          /* other important info for accessing web like roles, etc. */
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "10m" }
    );
  },

  generateRefreshToken: (user) => {
    return jwt.sign(
      { username: user.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );
  },
};
