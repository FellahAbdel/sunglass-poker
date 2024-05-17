const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;

// Destructure Schema and model from mongoose
const { Schema, model } = mongoose;

// Define game statuses as an enum
const GameStatus = {
  WAITING: "WAITING",
  IN_PROGRESS: "IN_PROGRESS",
};

// Define the schema for the game description
const GameDescriptionSchema = new Schema({
  serverName: {
    type: String,
    required: true,
    unique: true, // Ensures uniqueness of server names
  },
  roomPassword: {
    type: String,
    required: false,
  },
  rank: String,
  players: {
    type: Array,
    default: [], // Default value is an empty array
  },
  status: {
    type: String,
    enum: [GameStatus.WAITING, GameStatus.IN_PROGRESS], // Enumerated values for game status
    default: GameStatus.WAITING, // Default status is WAITING
  },
});

// Middleware to hash the room password before saving if it's modified
GameDescriptionSchema.pre("save", async function (next) {
  if (this.isModified("roomPassword") && this.roomPassword) {
    // Hash the room password using bcrypt
    this.roomPassword = await bcrypt.hash(this.roomPassword, saltRounds);
  }
  next();
});

// Create the GameDescription model based on the schema
const GameDescriptionModel = model("GameDescription", GameDescriptionSchema);

// Export the GameDescription model
module.exports = GameDescriptionModel;
