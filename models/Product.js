//////////////////////// PRODUCT SCHEMA ////////////////////////
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  sku: { type: String, index: true, required: true, unique: true },
  description: { type: String, required: true },
  type: { type: String, required: true },
  color: { type: String, required: true },
  size: { type: String, required: true },
  name: { type: String, required: true },
  supplier: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("product", productSchema, "products");