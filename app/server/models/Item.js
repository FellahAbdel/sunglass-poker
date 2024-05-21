// Item.js

// Import mongoose
const mongoose = require("mongoose");
// Destructure Schema and model from mongoose
const { Schema, model } = mongoose;

// Define the schema for items
const ItemSchema = new Schema({
  // Multilingual names for the item
  names: {
    en: { type: String, required: true, unique: true }, // English name, required and unique
    fr: { type: String, required: false }, // French name, optional
    es: { type: String, required: false }, // Spanish name, optional
    de: { type: String, required: false }, // German name, optional
    ch: { type: String, required: false }, // Chinese name, optional
  },
  // Price of the item
  price: {
    type: Number,
    required: true,
  },
  // Image source for the item
  imgSrc: {
    type: String,
    required: true,
  },
  // Category of the item
  category: {
    type: String,
    required: true,
  },
  // Eye position for the item
  eyePosition: {
    x: { type: Number, default: null }, // Default value for x-coordinate is null
    y: { type: Number, default: null }, // Default value for y-coordinate is null
  },
});

// Create the Item model based on the schema
const ItemModel = model("Item", ItemSchema);

// Export the Item model
module.exports = ItemModel;
