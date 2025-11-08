import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_BASE_URL = 'http://localhost:5000/api';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({ items: [], total: 0, itemCount: 0 });
  const [activeView, setActiveView] = useState('products');
  const [checkoutData, setCheckoutData] = useState({ name: '', email: '' });
  const [receipt, setReceipt] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState(localStorage.getItem('sessionId') || '');

  // Initialize session
  useEffect(() => {
    if (!sessionId) {
      const newSessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      setSessionId(newSessionId);
      localStorage.setItem('sessionId', newSessionId);
    }
  }, [sessionId]);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}/products`);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Fetch cart
  const fetchCart = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/cart`, {
        headers: { 'session-id': sessionId }
      });
      setCart(response.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  useEffect(() => {
    if (sessionId) {
      fetchCart();
    }
  }, [sessionId]);

  const addToCart = async (productId) => {
    try {
      await axios.post(`${API_BASE_URL}/cart`, 
        { productId, quantity: 1 },
        { headers: { 'session-id': sessionId } }
      );
      fetchCart();
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add item to cart');
    }
  };

  const removeFromCart = async (productId) => {
    try {
      await axios.delete(`${API_BASE_URL}/cart/${productId}`, {
        headers: { 'session-id': sessionId }
      });
      fetchCart();
    } catch (error) {
      console.error('Error removing from cart:', error);
      alert('Failed to remove item from cart');
    }
  };

  const updateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }

    try {
      // For simplicity, we'll remove and re-add with new quantity
      await removeFromCart(productId);
      if (newQuantity > 0) {
        await axios.post(`${API_BASE_URL}/cart`, 
          { productId, quantity: newQuantity },
          { headers: { 'session-id': sessionId } }
        );
      }
      fetchCart();
    } catch (error) {
      console.error('Error updating quantity:', error);
      alert('Failed to update quantity');
    }
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(`${API_BASE_URL}/checkout`, 
        {
          name: checkoutData.name,
          email: checkoutData.email,
          cartItems: cart.items
        },
        { headers: { 'session-id': sessionId } }
      );

      setReceipt(response.data.receipt);
      setCheckoutData({ name: '', email: '' });
      setActiveView('receipt');
      fetchCart(); // This will clear the cart after successful checkout
    } catch (error) {
      console.error('Error during checkout:', error);
      alert('Checkout failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const continueShopping = () => {
    setReceipt(null);
    setActiveView('products');
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="container">
          <h1>Vibe Commerce</h1>
          <nav>
            <button 
              className={`nav-btn ${activeView === 'products' ? 'active' : ''}`}
              onClick={() => setActiveView('products')}
            >
              Products
            </button>
            <button 
              className={`nav-btn ${activeView === 'cart' ? 'active' : ''}`}
              onClick={() => setActiveView('cart')}
            >
              Cart ({cart.itemCount})
            </button>
          </nav>
        </div>
      </header>

      <main className="container">
        {loading && (
          <div className="loading">
            <div className="spinner"></div>
            <p>Loading...</p>
          </div>
        )}

        {activeView === 'products' && !receipt && (
          <div className="products-view">
            <h2>Featured Products</h2>
            <div className="products-grid">
              {products.map(product => (
                <div key={product._id} className="product-card">
                  <img src={product.image} alt={product.name} />
                  <div className="product-info">
                    <h3>{product.name}</h3>
                    <p className="product-description">{product.description}</p>
                    <p className="product-price">${product.price}</p>
                    <button 
                      className="add-to-cart-btn"
                      onClick={() => addToCart(product._id)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeView === 'cart' && !receipt && (
          <div className="cart-view">
            <h2>Shopping Cart</h2>
            {cart.items.length === 0 ? (
              <div className="empty-cart">
                <p>Your cart is empty</p>
                <button 
                  className="continue-shopping-btn"
                  onClick={() => setActiveView('products')}
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {cart.items.map(item => (
                    <div key={item.productId} className="cart-item">
                      <div className="item-info">
                        <h4>{item.name}</h4>
                        <p className="item-price">${item.price}</p>
                      </div>
                      <div className="quantity-controls">
                        <button 
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                      <div className="item-total">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                      <button 
                        className="remove-btn"
                        onClick={() => removeFromCart(item.productId)}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
                <div className="cart-summary">
                  <div className="total-section">
                    <h3>Total: ${cart.total.toFixed(2)}</h3>
                  </div>
                  <button 
                    className="checkout-btn"
                    onClick={() => setActiveView('checkout')}
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {activeView === 'checkout' && !receipt && (
          <div className="checkout-view">
            <h2>Checkout</h2>
            <form onSubmit={handleCheckout} className="checkout-form">
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  value={checkoutData.name}
                  onChange={(e) => setCheckoutData({...checkoutData, name: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={checkoutData.email}
                  onChange={(e) => setCheckoutData({...checkoutData, email: e.target.value})}
                  required
                />
              </div>
              <div className="order-summary">
                <h3>Order Summary</h3>
                {cart.items.map(item => (
                  <div key={item.productId} className="order-item">
                    <span>{item.name} x {item.quantity}</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div className="order-total">
                  <strong>Total: ${cart.total.toFixed(2)}</strong>
                </div>
              </div>
              <div className="checkout-actions">
                <button 
                  type="button"
                  className="back-btn"
                  onClick={() => setActiveView('cart')}
                >
                  Back to Cart
                </button>
                <button 
                  type="submit" 
                  className="place-order-btn"
                  disabled={loading}
                >
                  {loading ? 'Processing...' : 'Place Order'}
                </button>
              </div>
            </form>
          </div>
        )}

        {receipt && (
          <div className="receipt-view">
            <div className="receipt">
              <h2>Order Confirmed! 🎉</h2>
              <div className="receipt-details">
                <p><strong>Order ID:</strong> {receipt.orderId}</p>
                <p><strong>Customer:</strong> {receipt.customer.name}</p>
                <p><strong>Email:</strong> {receipt.customer.email}</p>
                <p><strong>Order Date:</strong> {new Date(receipt.timestamp).toLocaleString()}</p>
                
                <h3>Order Items:</h3>
                {receipt.items.map(item => (
                  <div key={item.productId} className="receipt-item">
                    <span>{item.name} x {item.quantity}</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                
                <div className="receipt-totals">
                  <p>Subtotal: ${receipt.total.toFixed(2)}</p>
                  <p>Tax: ${receipt.tax.toFixed(2)}</p>
                  <p className="grand-total">Grand Total: ${receipt.grandTotal.toFixed(2)}</p>
                </div>
                
                <p className="thank-you">Thank you for your purchase!</p>
              </div>
              <button 
                className="continue-shopping-btn"
                onClick={continueShopping}
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;