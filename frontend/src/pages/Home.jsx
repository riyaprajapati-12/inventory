import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-lime-200 via-emerald-100 to-cyan-200">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white/50 backdrop-blur-md shadow-xl rounded-3xl p-10 text-center max-w-xl border border-white/30"
      >
        <h1 className="text-5xl font-extrabold text-emerald-800 drop-shadow-lg mb-6">
          Grocery Store Inventory
        </h1>
        <p className="text-lg text-gray-800 mb-8 leading-relaxed">
          Welcome to your smart inventory management system. Track, manage, and restock with ease.
        </p>

        <div className="flex justify-center gap-4">
          <Link
            to="/login"
            className="inline-block bg-gradient-to-r from-green-500 to-emerald-600 hover:from-emerald-600 hover:to-green-500 text-white font-semibold text-lg px-8 py-3 rounded-full shadow-lg transition-all duration-300 hover:scale-105"
          >
            Go to Login
          </Link>
          <Link
            to="/signup"
            className="inline-block bg-gradient-to-r from-green-500 to-emerald-600 hover:from-emerald-600 hover:to-green-500 text-white font-semibold text-lg px-8 py-3 rounded-full shadow-lg transition-all duration-300 hover:scale-105"
          >
            Go to Signup
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default Home;
