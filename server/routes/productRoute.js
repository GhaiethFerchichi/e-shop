const express = require("express");
const {
  createProduct,
  showAllProducts,
  findProductById,
  updateProduct,
  deleteProduct,
  getCountDocuments,
  getFeaturedProduct,
} = require("../controllers/ProductController");

const router = express.Router();

router.route(`/`).get(showAllProducts).post(createProduct);
router
  .route("/:id")
  .get(findProductById)
  .put(updateProduct)
  .delete(deleteProduct);
router.get("/get/count", getCountDocuments);
router.get("get/featured/:count", getFeaturedProduct);

module.exports = router;
