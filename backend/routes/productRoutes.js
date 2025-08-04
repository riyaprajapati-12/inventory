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

const authMiddleware = require("../middleware/authMiddleware");


router.get("/", authMiddleware, getAllProducts);
router.post("/", authMiddleware, addProduct);
router.delete("/:id", authMiddleware, deleteProduct);
router.put("/:id", authMiddleware, updateProduct);
router.get("/low-stock", authMiddleware, getLowStock);
router.get("/expired", authMiddleware, getExpired);

module.exports = router;
