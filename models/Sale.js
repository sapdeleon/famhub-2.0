//////////////////////// SALE SCHEMA ////////////////////////
const mongoose = require("mongoose");

const saleSchema = new mongoose.Schema({
  sku: { type: String, required: true },
  description: { type: String, required: true },
  cost: { type: Number, required: true },
  qty: { type: Number, required: true },
  total: { type: Number, default: 0 },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("sale", saleSchema, "sales");