// User.js

const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const UserSchema = new Schema(
  {
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
    baseAvatar: {
      type: Schema.Types.ObjectId,
      ref: "Item",
      required: true,
    },
    sunglasses: {
      type: Schema.Types.ObjectId,
      ref: "Item",
      default: null,
    },
    colorAvatar: {
      type: Schema.Types.ObjectId,
      ref: "Item",
      default: null,
    },
    stat: {
      type: Schema.Types.ObjectId,
      ref: "Stat",
      unique: true,
    },
    itemsOwned: [
      {
        type: Schema.Types.ObjectId,
        ref: "Item",
      },
    ],
    inGame: {
      type: Schema.Types.ObjectId,
      ref: "gameDescription",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = model("User", UserSchema);

module.exports = UserModel;
