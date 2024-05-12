const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const { Schema, model } = mongoose;

const GameStatus = {
  WAITING: "WAITING",
  IN_PROGRESS: "IN_PROGRESS",
};

const GameDescriptionSchema = new Schema({
  serverName: {
    type: String,
    required: true,
    unique: true
  },
  roomPassword: {
    type: String,
    required: true
  },
  rank: String,
  players: {
    type: Array,
    default: [],
  },
  status: {
    type: String,
    enum: [GameStatus.WAITING, GameStatus.IN_PROGRESS],
    default: GameStatus.WAITING,
  },  
});

GameDescriptionSchema.pre('save', async function (next) {
  if (this.isModified('roomPassword') || this.isNew) {
    this.roomPassword = await bcrypt.hash(this.roomPassword, saltRounds);
    next();
  } else {
    next();
  }
});

const GameDescriptionModel = model("GameDescription", GameDescriptionSchema);

module.exports = GameDescriptionModel;
