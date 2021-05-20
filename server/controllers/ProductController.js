const mongoose = require("mongoose");
const Product = require("../models/ProductModel");

const createProduct = (req, res) => {
  const product = new Product({
    _id: mongoose.Types.ObjectId(),
    ...req.body,
  });
  return product
    .save()
    .then((newProduct) =>
      res.status(201).json({
        success: true,
        message: "new product created successfully",
        product: newProduct,
      })
    )
    .catch((err) =>
      res.status(500).json({
        success: false,
        message: "server error. Please try again.",
        error: err.message,
      })
    );
};

module.exports = { createProduct };
