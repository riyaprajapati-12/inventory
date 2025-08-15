const Product = require("../models/Product");

// ✅ Get all products of current user
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({ userId: req.user.id })
      .sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: "Error fetching products" });
  }
};

// ✅ Add new product for current user
exports.addProduct = async (req, res) => {
  try {
    const newProduct = new Product({
      ...req.body,
      userId: req.user.id
    });
    const saved = await newProduct.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: "Error adding product", error: err.message });
  }
};

// ✅ Delete product only if belongs to current user
exports.deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!deleted) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting product" });
  }
};

// ✅ Update product only if belongs to current user
exports.updateProduct = async (req, res) => {
  try {
    const updated = await Product.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ message: "Error updating product" });
  }
};

// ✅ Low stock for current user
exports.getLowStock = async (req, res) => {
  try {
    const lowStock = await Product.find({
      userId: req.user.id,
      quantity: { $lt: 10 }
    });
    res.status(200).json(lowStock);
  } catch (err) {
    res.status(500).json({ message: "Error fetching low stock items" });
  }
};

// ✅ Expired products for current user
exports.getExpired = async (req, res) => {
  try {
    const today = new Date();
    const expired = await Product.find({
      userId: req.user.id,
      expiryDate: { $lt: today }
    });
    res.status(200).json(expired);
  } catch (err) {
    res.status(500).json({ message: "Error fetching expired items" });
  }
};
