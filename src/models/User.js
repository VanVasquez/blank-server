const { Schema, SchemaTypes, model } = require('mongoose');

const userSchema = new Schema(
  {
    name: {
      type: SchemaTypes.String,
      required: true,
    },
    username: {
      type: SchemaTypes.String,
      unique: true,
      required: true,
    },
    password: {
      type: SchemaTypes.String,
      required: true,
    },
    role: {
      type: SchemaTypes.String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model('User', userSchema);
