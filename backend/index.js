dotenv.config();

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');



const app = express();
const PORT = process.env.PORT || 8080;


app.use(cors({
  origin: "*", 
  credentials: true
}));
app.use(express.json());


mongoose.connect(process.env.MONGO_URI, {})
  .then(() => console.log(" Connected to MongoDB"))
  .catch(err => {
    console.error(" MongoDB connection failed:", err.message);
    process.exit(1);
  });


const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');


app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);


app.get('/', (req, res) => {
  res.send(' Grocery Inventory API is running');
});


app.use((req, res) => {
  res.status(404).json({ message: " Route not found" });
});

// Start Server
// app.listen(PORT, () => {
//   console.log(` Server running on http://localhost:${PORT}`);
// });
module.exports = app;