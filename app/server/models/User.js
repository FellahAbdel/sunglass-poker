// User.js

// Import mongoose
const mongoose = require("mongoose");

// Destructure Schema and model from mongoose
const { Schema, model } = mongoose;

// Define the schema for user data
const UserSchema = new Schema(
  {
    // User's pseudonym
    pseudo: {
      type: String,
      required: true,
      unique: true, // Pseudo must be unique
    },
    // User's email
    email: {
      type: String,
      required: true,
      unique: true, // Email must be unique
    },
    // User's password (hashed)
    password: {
      type: String,
      required: true,
    },
    // Number of coins owned by the user
    coins: {
      type: Number,
      required: true,
      default: 1000, // Default value for coins
    },
    // Reference to the base avatar item
    baseAvatar: {
      type: Schema.Types.ObjectId,
      ref: "Item", // Reference to the Item model
      required: true,
    },
    // Reference to the sunglasses item (optional)
    sunglasses: {
      type: Schema.Types.ObjectId,
      ref: "Item", // Reference to the Item model
      default: null, // Default value is null
    },
    // Reference to the color avatar item (optional)
    colorAvatar: {
      type: Schema.Types.ObjectId,
      ref: "Item", // Reference to the Item model
      default: null, // Default value is null
    },
    // Reference to the user's statistics
    stat: {
      type: Schema.Types.ObjectId,
      ref: "Stat", // Reference to the Stat model
      unique: true, // Each user should have only one set of statistics
    },
    // Array of items owned by the user
    itemsOwned: [
      {
        type: Schema.Types.ObjectId,
        ref: "Item", // Reference to the Item model
      },
    ],
    // Reference to the game the user is currently in (optional)
    inGame: {
      type: Schema.Types.ObjectId || null,
      ref: "gameDescription", // Reference to the GameDescription model
      required: false, // Field is not required
      default: null, // Default value is null
    },
  },
  {
    timestamps: true, // Add createdAt and updatedAt timestamps
  }
);

// Create the User model based on the schema
const UserModel = model("User", UserSchema);

// Export the User model
module.exports = UserModel;

