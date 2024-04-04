// Stat.js
const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const gameRoomsSchema = new Schema({
  serverName: String,
  password: String,
  rank: String,
});

const gameRooms = model("gameRooms", gameRoomsSchema);

module.exports = gameRooms;
