const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// GET /api/products - Get all products
router.get("/", async (req, res) => {
  try {
    // Check if products exist, if not create mock products
    let products = await Product.find();

    if (products.length === 0) {
      // Create mock products
      const mockProducts = [
        {
          name: "Wireless Bluetooth Headphones",
          price: 79.99,
          description:
            "High-quality wireless headphones with noise cancellation",
          image:
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
          category: "Electronics",
        },
        {
          name: "Smart Watch",
          price: 199.99,
          description: "Feature-rich smartwatch with health monitoring",
          image:
            "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
          category: "Electronics",
        },
        {
          name: "Laptop Backpack",
          price: 49.99,
          description: "Durable laptop backpack with multiple compartments",
          image:
            "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
          category: "Accessories",
        },
        {
          name: "Coffee Mug",
          price: 14.99,
          description: "Ceramic coffee mug with elegant design",
          image:
            "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=500",
          category: "Home",
        },
        {
          name: "Fitness Tracker",
          price: 89.99,
          description: "Advanced fitness tracker with heart rate monitor",
          image:
            "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=500",
          category: "Fitness",
        },
        {
          name: "Desk Lamp",
          price: 34.99,
          description: "LED desk lamp with adjustable brightness",
          image:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500",
          category: "Home",
        },
        {
          name: "Phone Case",
          price: 19.99,
          description: "Protective phone case with stylish design",
          image:
            "https://images.unsplash.com/photo-1601593346740-925612772716?w=500",
          category: "Accessories",
        },
        {
          name: "Water Bottle",
          price: 24.99,
          description: "Insulated stainless steel water bottle",
          image:
            "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500",
          category: "Fitness",
        },
      ];

      products = await Product.insertMany(mockProducts);
    }

    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

module.exports = router;
