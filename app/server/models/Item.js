// Item.js

const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const ItemSchema = new Schema({
  names: {
    en: { type: String, required: true },
    fr: { type: String, required: false },
    es: { type: String, required: false },
    de: { type: String, required: false }
  },
  price: {
    type: Number,
    required: true,
  },
  imgSrc: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  eyePosition: {
    x: { type: Number, default: null },
    y: { type: Number, default: null },
  },
});

const ItemModel = model("Item", ItemSchema);

module.exports = ItemModel;
