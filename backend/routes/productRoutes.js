const express = require("express");
const router = express.Router();

const {
  getAllProducts,
  addProduct,
  deleteProduct,
  updateProduct,
  getLowStock,
  getExpired,
} = require("../controllers/productController");

const authMiddleware = require("../middleware/authMiddleware")
router.use(authMiddleware);

// Get all products for logged-in user
router.get("/", getAllProducts);

// Add product for logged-in user
router.post("/", addProduct);

// Delete product (only if owned by user)
router.delete("/:id", deleteProduct);

// Update product (only if owned by user)
router.put("/:id", updateProduct);

// Low stock products for logged-in user
router.get("/low-stock", getLowStock);

// Expired products for logged-in user
router.get("/expired", getExpired);

module.exports = router;

