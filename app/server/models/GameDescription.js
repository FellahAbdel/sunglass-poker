// Stat.js
const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const GameDescriptionSchema = new Schema({
  serverName: String,
  roomPassword: String,
  rank: String,
  countPlayers: Number,
});

const GameDescriptionModel = model("gameDescription", GameDescriptionSchema);

module.exports = GameDescriptionModel;
