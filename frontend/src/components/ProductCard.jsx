import { Pencil, Trash2 } from "lucide-react"; // Icon library

function ProductCard({ name, category, quantity, price, expiryDate, onDelete, onEdit, id }) {
  return (
    <div className="bg-white shadow-md rounded-2xl p-6 w-full max-w-md hover:shadow-lg transition duration-300 flex flex-col justify-between border border-gray-200">
      <div>
        <h2 className="text-2xl font-bold text-emerald-700 mb-2">{name}</h2>
        <div className="space-y-1 text-sm text-gray-600">
          <p><span className="font-semibold">Category:</span> {category}</p>
          <p><span className="font-semibold">Quantity:</span> {quantity}</p>
          <p><span className="font-semibold">Price:</span> ₹{price}</p>
          <p className="text-sm text-red-500">
            <strong>Expiry:</strong> {new Date(expiryDate).toLocaleDateString("en-GB")}
          </p>
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-5 flex gap-3">
  <button
    onClick={() => onEdit(id)}
    className="flex-1 flex items-center justify-center gap-2 bg-yellow-100 text-yellow-800 font-medium py-2 rounded-lg border border-yellow-300 hover:bg-yellow-200 hover:shadow-lg transition-all duration-300 ease-in-out"
  >
    <Pencil size={16} className="text-yellow-600" />
    <span>Edit</span>
  </button>

  <button
    onClick={() => onDelete(id)}
    className="flex-1 flex items-center justify-center gap-2 bg-red-100 text-red-800 font-medium py-2 rounded-lg border border-red-300 hover:bg-red-200 hover:shadow-lg transition-all duration-300 ease-in-out"
  >
    <Trash2 size={16} className="text-red-600" />
    <span>Delete</span>
  </button>
</div>
    </div>
  );
}

export default ProductCard;
