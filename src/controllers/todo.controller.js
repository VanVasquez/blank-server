const model = require('../models');

module.exports = {
  addTodo: async (req, res) => {
    try {
      const { user, todo } = req.body;
      const Author = await model.User.findOne({ username: user });
      const todos = await model.Todo.create({ author: Author._id, todo });
      res.status(201).json({ id: todos._id });
    } catch (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  deleteTodo: async (req, res) => {
    try {
      const { id } = req.query;
      console.log(id);
      await model.Todo.findByIdAndDelete(id);

      res.status(200).json();
    } catch (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  getTodo: async (req, res) => {
    try {
      const { user } = req.query;
      const Author = await model.User.findOne({ username: user });
      const todos = await model.Todo.find({ author: Author._id }).sort({
        createdAt: -1,
      });
      res.status(200).json(todos);
    } catch (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};
