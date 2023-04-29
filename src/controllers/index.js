const auth = require('./auth.controller');
const token = require('./token.controller');
const todo = require('./todo.controller');

module.exports = {
  auth,
  todo,
  token,
};
