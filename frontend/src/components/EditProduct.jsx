import { useState, useEffect } from "react";

function EditProduct({ productData, onSubmit }) {
  const [product, setProduct] = useState(productData || {
    name: "",
    category: "",
    quantity: "",
    price: "",
    expiryDate: "",
  });

  useEffect(() => {
    if (productData) setProduct(productData);
  }, [productData]);

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(product);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/90 backdrop-blur p-6 rounded-xl shadow-md w-full max-w-md border border-white/50"
    >
      <h2 className="text-2xl font-bold text-center text-emerald-700 mb-6">
         Edit Product
      </h2>

      <div className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={product.name}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
          required
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={product.category}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
          required
        />

        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={product.quantity}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={product.price}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
          required
        />

        <input
          type="date"
          name="expiryDate"
          value={product.expiryDate}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
          required
        />
      </div>

      <button
        type="submit"
        className="mt-6 w-full bg-gradient-to-r from-emerald-500 to-lime-500 hover:from-lime-500 hover:to-emerald-500 text-white font-semibold py-2 rounded-lg transition duration-300"
      >
         Save Changes
      </button>
    </form>
  );
}

export default EditProduct;
