const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  name: String,
  imgURL: String,
  color: String,
  countStock: Number,
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
