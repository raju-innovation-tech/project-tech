const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');

// POST /api/checkout - Process checkout
router.post('/', async (req, res) => {
  try {
    const { name, email, cartItems } = req.body;
    const sessionId = req.headers['session-id'];
    
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }
    
    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }
    
    // Calculate total
    const total = cartItems.reduce((sum, item) => {
      return sum + (item.price * item.quantity);
    }, 0);
    
    // Generate mock receipt
    const receipt = {
      orderId: `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      customer: { name, email },
      items: cartItems,
      total: parseFloat(total.toFixed(2)),
      tax: parseFloat((total * 0.08).toFixed(2)),
      grandTotal: parseFloat((total * 1.08).toFixed(2)),
      timestamp: new Date().toISOString(),
      status: 'completed'
    };
    
    // Clear the cart after successful checkout
    if (sessionId) {
      await Cart.findOneAndDelete({ sessionId });
    }
    
    res.json({
      success: true,
      message: 'Order placed successfully',
      receipt
    });
  } catch (error) {
    console.error('Error during checkout:', error);
    res.status(500).json({ error: 'Checkout failed' });
  }
});

module.exports = router;