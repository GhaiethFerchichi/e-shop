const mongoose = require("mongoose");
const Category = require("../models/CategoryModel");

const showAllCategories = (req, res) => {
  const category = Category.find()
    .then((result) =>
      res.status(201).json({
        success: true,
        message: "Show all Categories",
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
const createCategory = (req, res) => {
  const category = new Category({
    _id: mongoose.Types.ObjectId(),
    ...req.body,
  });
  return category
    .save()
    .then((newCategory) =>
      res.status(201).json({
        success: true,
        message: "Category created",
        data: newCategory,
      })
    )
    .catch((err) =>
      res.status(404).json({
        success: false,
        message: "server error. Please try again.",
        error: err.message,
      })
    );
};

const deleteCategory = (req, res) =>
  Category.findByIdAndRemove(req.params.id)
    .then((deletedCategory) => {
      if (deletedCategory)
        return res.status(201).json({
          success: true,
          message: "Category deleted",
          data: deletedCategory,
        });

      return res.status(404).json({
        success: false,
        message: "Category not found !",
      });
    })
    .catch((err) =>
      res.status(500).json({
        success: false,
        message: "server error. Please try again.",
        error: err.message,
      })
    );

const getCategoryById = (req, res) =>
  Category.findById(req.params.id)
    .then((categoryById) => {
      if (categoryById)
        return res.status(200).json({
          success: true,
          message: `Category with id ${req.params.id}`,
          data: { categoryById },
        });
      return res.status(200).json({
        success: false,
        message: `Category with id ${req.params.id} not found !`,
      });
    })
    .catch((err) =>
      res.status(500).json({
        success: false,
        message: "server error. Please try again.",
        error: err.message,
      })
    );

const updateCategory = (req, res) =>
  Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true, // you can set to false if you want to dispaly the old data
  })
    .then((categoryById) => {
      if (categoryById)
        return res.status(200).json({
          success: true,
          message: `Category with id ${req.params.id}`,
          data: { categoryById },
        });
      return res.status(200).json({
        success: false,
        message: `Category with id ${req.params.id} not found !`,
      });
    })
    .catch((err) =>
      res.status(500).json({
        success: false,
        message: "server error. Please try again.",
        error: err.message,
      })
    );

module.exports = {
  showAllCategories,
  createCategory,
  deleteCategory,
  getCategoryById,
  updateCategory,
};
