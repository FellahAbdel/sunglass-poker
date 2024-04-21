// Stat.js
const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const GameDescriptionSchema = new Schema({
  serverName: String,
  roomPassword: String,
  rank: String,
  countPlayers: Number,
  master: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const GameDescriptionModel = model("gameDescription", GameDescriptionSchema);

module.exports = GameDescriptionModel;
