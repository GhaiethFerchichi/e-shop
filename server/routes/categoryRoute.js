const express = require("express");
const {
  showAllCategories,
  createCategory,
  deleteCategory,
  getCategoryById,
  updateCategory,
} = require("../controllers/CategoryController");

const router = express.Router();

router.route("/").get(showAllCategories).post(createCategory);
router
  .route("/:id")
  .get(getCategoryById)
  .delete(deleteCategory)
  .put(updateCategory);

module.exports = router;
