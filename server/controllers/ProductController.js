const mongoose = require("mongoose");
const Category = require("../models/CategoryModel");
const Product = require("../models/ProductModel");

const showAllProducts = (req, res) => {
  let filter = {};
  if (req.query.category)
    filter = { ...filter, category: req.query.category.split(",") };
  return Product.find(filter)
    .populate("category")
    .then((result) =>
      res.json({
        success: true,
        message: "show Product",
        data: result,
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

const createProduct = (req, res) => {
  Category.findById(req.body.category)
    .then((result) => {
      if (result) {
        const product = new Product({
          _id: mongoose.Types.ObjectId(),
          ...req.body,
        });

        return product
          .save()
          .then((newProduct) =>
            res.status(201).json({
              success: true,
              message: `product created with id ${newProduct._id}`,
              data: newProduct,
            })
          )
          .catch((err) =>
            res.status(500).json({
              success: false,
              message: "server error. Please try again.",
              error: err.message,
            })
          );
      }
      return res.status(400).json({
        success: false,
        message: `there is no category with id ${req.body.category}`,
      });
    })
    .catch((err) =>
      res.status(500).json({
        success: false,
        message: "server error. Please try again.",
        error: err.message,
      })
    );
};

const findProductById = (req, res) =>
  Product.findById(req.params.id)
    .populate("category")
    .then((productResult) =>
      !productResult
        ? res.status(404).json({
            success: false,
            message: `there is no category with id ${req.body.category}`,
          })
        : res.status(201).json({
            success: true,
            message: `product with id ${productResult._id}`,
            data: productResult,
          })
    )
    .catch((err) =>
      res.status(500).json({
        success: false,
        message: "server error. Please try again.",
        error: err.message,
      })
    );

const updateProduct = (req, res) =>
  Category.findById(req.body.category)
    .then((catergoryResult) =>
      !catergoryResult
        ? res.status(404).json({
            success: false,
            message: `there is no category with id ${req.body.category}`,
          })
        : Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
          }).then((productUpdated) =>
            res.status(201).json({
              success: true,
              message: `product with id ${productUpdated._id} updated `,
              data: productUpdated,
            })
          )
    )
    .catch((err) =>
      res.status(500).json({
        success: false,
        message: "server error. Please try again.",
        error: err.message,
      })
    );

const deleteProduct = (req, res) =>
  !mongoose.isValidObjectId(req.params.id)
    ? res
        .status(400)
        .json({ success: false, statusCode: 400, message: "invalid ObjectId " })
    : Product.findByIdAndRemove(req.params.id)
        .then((removedProduct) =>
          !removedProduct
            ? res.status(400).json({
                success: false,
                codeStatus: 400,
                message: `there is no product with id ${req.params.id}`,
              })
            : res.status(201).json({
                success: true,
                message: `product with id ${req.params.id} deleted`,
                data: deleteProduct,
              })
        )
        .catch((err) =>
          res.status(500).json({
            success: false,
            message: "server error. Please try again.",
            error: err.message,
          })
        );

const getCountDocuments = (req, res) =>
  Product.countDocuments((count) => count)
    .then((productCount) =>
      res.status(201).json({
        success: true,
        codeStatus: 201,
        message: "productCount ",
        productCount,
      })
    )
    .catch((err) =>
      res.status(500).json({
        success: false,
        codeStatus: 500,
        message: "server error. Please try again.",
        error: err.message,
      })
    );

const getFeaturedProduct = (req, res) =>
  Product.find({ isFeatured: true }).limit(
    +(req.params.count ? req.params.count : 0)
  );

module.exports = {
  showAllProducts,
  createProduct,
  findProductById,
  updateProduct,
  deleteProduct,
  getCountDocuments,
  getFeaturedProduct,
};
