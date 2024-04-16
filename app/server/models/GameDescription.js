// Stat.js
const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const GameDescriptionSchema = new Schema({
  serverName: String,
  password: String,
  rank: String,
});

const GameDescriptionModel = model("gameDescription", GameDescriptionSchema);

module.exports = GameDescriptionModel;