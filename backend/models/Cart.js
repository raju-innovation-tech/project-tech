const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  name: String,
  price: Number
});

const cartSchema = new mongoose.Schema({
  sessionId: {
    type: String,
    required: true,
    unique: true
  },
  items: [cartItemSchema],
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 86400 // 24 hours
  }
});

module.exports = mongoose.model('Cart', cartSchema);