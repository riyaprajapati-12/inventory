import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import EditProduct from "../components/EditProduct";
import axiosInstance from "../api/axiosInstance";
import { LogOut, PlusCircle, X } from "lucide-react";

function Dashboard() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/products");
      setProducts(res.data);
      setFiltered(res.data);

      
      const uniqueCats = [...new Set(res.data.map((p) => p.category))];
      setCategories(uniqueCats);
    } catch (error) {
      setErrorMsg("❌ Failed to fetch products. Please login again.");
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setSelectedCategory(value);

    if (value === "all") {
      setFiltered(products);
    } else {
      setFiltered(products.filter((p) => p.category === value));
    }
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/products/${id}`);
      const updated = products.filter((item) => item._id !== id);
      setProducts(updated);
      setFiltered(
        selectedCategory === "all"
          ? updated
          : updated.filter((p) => p.category === selectedCategory)
      );
    } catch (error) {
      alert("❌ Failed to delete product");
    }
  };

  const handleEdit = (id) => {
    const productToEdit = products.find((item) => item._id === id);
    setEditingProduct(productToEdit);
  };

  const handleUpdate = async (updatedProduct) => {
    try {
      await axiosInstance.put(`/products/${editingProduct._id}`, updatedProduct);
      setEditingProduct(null);
      fetchProducts();
    } catch (error) {
      alert("❌ Failed to update product");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="flex h-screen bg-gradient-to-br from-lime-200 via-emerald-100 to-cyan-200">
      {/* Sidebar */}
      <aside className="w-64 bg-white/70 backdrop-blur-md border-r shadow-lg p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-3xl font-extrabold text-emerald-700 mb-8">Inventory</h2>
          <nav className="flex flex-col gap-4 text-[16px] font-medium text-gray-800">
            <Link to="/low-stock" className="hover:text-emerald-600 transition">
              📉 Low Stock
            </Link>
            <Link to="/expired" className="hover:text-emerald-600 transition">
              ⌛ Expired Items
            </Link>
            <Link
              to="/add-product"
              className="flex items-center gap-2 text-green-700 hover:text-green-800 transition"
            >
              <PlusCircle size={18} />
              Add Product
            </Link>
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-red-600 hover:text-red-700 transition"
        >
          <LogOut size={18} />
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto bg-white/50 backdrop-blur-sm">
        <h1 className="text-3xl font-bold text-emerald-800 mb-4">All Products</h1>

        {errorMsg && <p className="text-red-600 font-medium mb-4">{errorMsg}</p>}

        {/* Category Filter */}
        <div className="mb-6 flex items-center gap-4">
          <label className="text-gray-800 font-medium">Filter by Category:</label>
          <select
            value={selectedCategory}
            onChange={handleFilterChange}
            className="border border-gray-300 w-64 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          >
            <option value="all">All</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Loading Spinner */}
        {loading ? (
          <div className="flex justify-center items-center mt-20">
            <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : editingProduct ? (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4">
  <div className="relative w-full max-w-md">
    <EditProduct productData={editingProduct} onSubmit={handleUpdate} />
    <button
      onClick={() => setEditingProduct(null)}
      className="absolute top-2 right-2 bg-red-100 hover:bg-red-200 text-red-600 px-3 py-1 rounded text-sm flex items-center gap-1 transition"
    >
      <X size={14} />
      Cancel
    </button>
  </div>
</div>

        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filtered.length > 0 ? (
              filtered.map((item) => (
                <ProductCard
                  key={item._id}
                  id={item._id}
                  name={item.name}
                  category={item.category}
                  quantity={item.quantity}
                  price={item.price}
                  expiryDate={item.expiryDate}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                />
              ))
            ) : (
              <p className="text-gray-600 text-lg col-span-full">No products found.</p>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default Dashboard;
