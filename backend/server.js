const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const productRoutes = require("./routes/products");
const cartRoutes = require("./routes/cart");
const checkoutRoutes = require("./routes/checkout");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection (using MongoDB Atlas for persistence)
const MONGODB_URI = "mongodb://localhost:27017/vibecommerce";
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("MongoDB connection error:", err));

// Routes
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/checkout", checkoutRoutes);

// Basic route
app.get("/", (req, res) => {
  res.json({ message: "Vibe Commerce Backend API" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
