// Stat.js
const mongoose = require("mongoose");
const { status } = require("../controller/gameController");

const { Schema, model } = mongoose;

const GameDescriptionSchema = new Schema({
  serverName: String,
  roomPassword: String,
  rank: String,
  players: {
    type: Array,
    default: [],
  },
  status: {
    type: String,
    default: status.WAITING,
  },  
});

const GameDescriptionModel = model("gameDescription", GameDescriptionSchema);

module.exports = GameDescriptionModel;
