// User.js

const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const UserSchema = new Schema({
  pseudo: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  coins: {
    type: Number,
    required: true,
    default: 1000,
  },
  avatar: {
    type: Schema.Types.ObjectId,
    ref: "Item",
    required: true
  },
  stat: {
    type: Schema.Types.ObjectId,
    ref: "Stat",
    unique: true,
  },
  itemsOwned: [{
    type: Schema.Types.ObjectId,
    ref: "Item",
  }],
});

const UserModel = model("User", UserSchema);

module.exports = UserModel;
