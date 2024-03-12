// Stat.js
const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const StatSchema = new Schema({
  maxCoins: {
    type: Number,
    required: true,
  },
  maxGain: {
    type: Number,
    required: true,
  },
  totalGain: {
    type: Number,
    required: true,
  },
  experience: {
    type: Number,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    unique: true,
    required: true,
  },
});

const StatModel = model("Stat", StatSchema);

module.exports = StatModel;
