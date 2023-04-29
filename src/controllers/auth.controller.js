const model = require('../models');
const bcrypt = require('bcryptjs');
const { generateAccessToken, generateRefreshToken } = require('../token');

const encryptPassword = async (password) => {
  return bcrypt.hash(password, 10);
};

const verifyPassword = async (password, userPassword) => {
  return bcrypt.compare(password, userPassword);
};

module.exports = {
  CreateAccount: async (req, res) => {
    const { name, username, password } = req.body;
    const existingUser = await model.User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'username taken' });
    }
    const hashPassword = await encryptPassword(password);
    try {
      const newUser = new model.User({
        name,
        username,
        password: hashPassword,
        role: 'User',
      });

      await newUser.save();

      res.status(201).json();
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal Server Error', error });
    }
  },
  LoginAccount: async (req, res) => {
    const { username, password } = req.body;
    const user = await model.User.findOne({ username });
    try {
      if (!user) {
        return res.status(400).json({ message: 'username not found' });
      }
      if (!(await verifyPassword(password, user.password))) {
        return res.status(400).json({ message: 'incorrect username or password' });
      }
      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);

      res.cookie('jwt', refreshToken, {
        httpOnly: true,
        sameSite: 'None',
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.status(200).json({ accessToken, name: user.name });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal Server Error', error });
    }
  },
};
