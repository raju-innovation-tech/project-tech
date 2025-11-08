const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const { v4: uuidv4 } = require('uuid');

// Helper function to get or create cart
const getOrCreateCart = async (sessionId) => {
  let cart = await Cart.findOne({ sessionId }).populate('items.productId');
  
  if (!cart) {
    cart = new Cart({ sessionId, items: [] });
    await cart.save();
  }
  
  return cart;
};

// GET /api/cart - Get cart with total
router.get('/', async (req, res) => {
  try {
    const sessionId = req.headers['session-id'] || uuidv4();
    const cart = await getOrCreateCart(sessionId);
    
    const total = cart.items.reduce((sum, item) => {
      return sum + (item.price * item.quantity);
    }, 0);
    
    res.json({
      sessionId,
      items: cart.items,
      total: parseFloat(total.toFixed(2)),
      itemCount: cart.items.reduce((count, item) => count + item.quantity, 0)
    });
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ error: 'Failed to fetch cart' });
  }
});

// POST /api/cart - Add item to cart
router.post('/', async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const sessionId = req.headers['session-id'] || uuidv4();
    
    if (!productId || !quantity) {
      return res.status(400).json({ error: 'Product ID and quantity are required' });
    }
    
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    let cart = await getOrCreateCart(sessionId);
    
    // Check if item already exists in cart
    const existingItemIndex = cart.items.findIndex(
      item => item.productId.toString() === productId
    );
    
    if (existingItemIndex > -1) {
      // Update quantity if item exists
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      // Add new item
      cart.items.push({
        productId,
        quantity,
        name: product.name,
        price: product.price
      });
    }
    
    await cart.save();
    
    const total = cart.items.reduce((sum, item) => {
      return sum + (item.price * item.quantity);
    }, 0);
    
    res.json({
      sessionId,
      items: cart.items,
      total: parseFloat(total.toFixed(2)),
      itemCount: cart.items.reduce((count, item) => count + item.quantity, 0),
      message: 'Item added to cart successfully'
    });
  } catch (error) {
    console.error('Error adding item to cart:', error);
    res.status(500).json({ error: 'Failed to add item to cart' });
  }
});

// DELETE /api/cart/:id - Remove item from cart
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const sessionId = req.headers['session-id'];
    
    if (!sessionId) {
      return res.status(400).json({ error: 'Session ID is required' });
    }
    
    const cart = await Cart.findOne({ sessionId });
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }
    
    cart.items = cart.items.filter(item => item.productId.toString() !== id);
    await cart.save();
    
    const total = cart.items.reduce((sum, item) => {
      return sum + (item.price * item.quantity);
    }, 0);
    
    res.json({
      items: cart.items,
      total: parseFloat(total.toFixed(2)),
      itemCount: cart.items.reduce((count, item) => count + item.quantity, 0),
      message: 'Item removed from cart successfully'
    });
  } catch (error) {
    console.error('Error removing item from cart:', error);
    res.status(500).json({ error: 'Failed to remove item from cart' });
  }
});

module.exports = router;