// Item.js

const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const ItemSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  imgSrc: {
    type: String,
    required: true,
  }
});

const ItemModel = model("Item", ItemSchema);

module.exports = ItemModel;
