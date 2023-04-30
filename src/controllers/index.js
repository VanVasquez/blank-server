const auth = require('./auth.controller');
const token = require('./token.controller');
const todo = require('./todo.controller');
const user = require('./user.controller');
module.exports = {
  auth,
  todo,
  token,
  user,
};
