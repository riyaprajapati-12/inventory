const Product = require("../models/Product");


exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: "Error fetching products" });
  }
};


exports.addProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const saved = await newProduct.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: "Error adding product", error: err.message });
  }
};


exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting product" });
  }
};


exports.updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ message: "Error updating product" });
  }
};


exports.getLowStock = async (req, res) => {
  try {
    const lowStock = await Product.find({ quantity: { $lt: 10 } });
    res.status(200).json(lowStock);
  } catch (err) {
    res.status(500).json({ message: "Error fetching low stock items" });
  }
};


exports.getExpired = async (req, res) => {
  try {
    const today = new Date();
    const expired = await Product.find({ expiryDate: { $lt: today } });
    res.status(200).json(expired);
  } catch (err) {
    res.status(500).json({ message: "Error fetching expired items" });
  }
};
