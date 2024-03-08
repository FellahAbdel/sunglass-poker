// User.js

const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const UserSchema = new Schema({
  pseudo: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  coins: {
    type: Number,
    required: true,
    default: 0,
  },
  avatar: {
    type: Number,
    required: true,
    default: 1,
  },
  stat: {
    type: Schema.Types.ObjectId,
    ref: "Stat",
    unique: true,
  },
});

const UserModel = model("User", UserSchema);

module.exports = UserModel;
