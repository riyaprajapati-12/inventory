import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { Home } from "lucide-react";

function AddProduct() {
  const [product, setProduct] = useState({
    name: "",
    category: "",
    quantity: "",
    price: "",
    expiryDate: "",
  });

  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      await axiosInstance.post("/products", product);
      navigate("/dashboard");
    } catch (error) {
      setErrorMsg("❌ Failed to add product");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-lime-200 via-emerald-100 to-cyan-100 relative px-4">
      {/* Back to Dashboard */}
      <Link
        to="/dashboard"
        className="absolute top-5 left-5 flex items-center gap-1 text-indigo-600 hover:text-indigo-800 transition"
        title="Back to Dashboard"
      >
        <Home size={24} />
        
      </Link>

      <form
        onSubmit={handleSubmit}
        className="bg-white/90 backdrop-blur-md p-8 rounded-xl shadow-md w-full max-w-md border border-white/60"
      >
        <h2 className="text-2xl font-bold mb-6 text-emerald-700 text-center">
          ➕ Add New Product
        </h2>

        {errorMsg && <p className="text-red-600 font-medium mb-4 text-center">{errorMsg}</p>}

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
          Add Product
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
