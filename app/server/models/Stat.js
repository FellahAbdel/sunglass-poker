// Stat.js

// Import mongoose
const mongoose = require("mongoose");

// Destructure Schema and model from mongoose
const { Schema, model } = mongoose;

// Define the schema for user statistics
const StatSchema = new Schema({
  // Maximum coins achieved by the user
  maxCoins: {
    type: Number,
    required: true,
  },
  // Maximum gain achieved by the user
  maxGain: {
    type: Number,
    required: true,
  },
  // Total gain accumulated by the user
  totalGain: {
    type: Number,
    required: true,
  },
  // Experience points earned by the user
  experience: {
    type: Number,
    required: true,
  },
  // Reference to the user associated with these statistics
  user: {
    type: Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    unique: true, // Each user should have only one set of statistics
    required: true,
  },
});

// Create the Stat model based on the schema
const StatModel = model("Stat", StatSchema);

// Export the Stat model
module.exports = StatModel;

