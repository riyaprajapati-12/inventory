import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { ArrowLeft } from "lucide-react";

function ExpiredItems() {
  const [expiredItems, setExpiredItems] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExpired = async () => {
      try {
        const res = await axiosInstance.get("/products/expired");
        setExpiredItems(res.data);
      } catch (error) {
        setErrorMsg("❌ Failed to fetch expired items.");
        console.error(error);
      }
    };

    fetchExpired();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-lime-200 via-emerald-100 to-cyan-100 p-10 relative">
      {/* Back to Dashboard */}
      <button
        onClick={() => navigate("/dashboard")}
        className="absolute top-5 right-5 flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded shadow-md transition"
      >
        <ArrowLeft size={16} />
        Dashboard
      </button>

      <h1 className="text-3xl font-bold text-red-700 mb-6">☠️ Expired Products</h1>

      {errorMsg && <p className="text-red-600 font-semibold mb-4">{errorMsg}</p>}

      {expiredItems.length === 0 ? (
        <p className="text-green-700 font-medium bg-green-100 border border-green-300 px-4 py-2 rounded shadow inline-block">
          🎉 No expired items!
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {expiredItems.map((item) => (
            <div
              key={item._id}
              className="rounded-xl border border-red-400 bg-white/80 backdrop-blur-sm p-5 shadow-[0_8px_16px_rgba(0,0,0,0.05)] hover:shadow-md transition"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2 text-red-700">
                  <span className="text-xl">☠️</span>
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                </div>
                <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full font-medium">
                  Expired
                </span>
              </div>

              <div className="text-sm text-gray-700 space-y-1">
                <p>
                  <strong>Category:</strong> <span className="italic">{item.category}</span>
                </p>
                <p>
                  <strong>Quantity:</strong> {item.quantity}
                </p>
                <p className="text-gray-500">
                  <strong>Price:</strong> ₹{item.price} &nbsp;|&nbsp;
                  <strong>Expired on:</strong> {new Date(item.expiryDate).toLocaleDateString("en-GB")}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ExpiredItems;
