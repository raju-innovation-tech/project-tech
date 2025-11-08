Vibe Commerce - Full Stack Shopping Cart
📋 Project Overview
A modern e-commerce shopping cart application built with React frontend and Node.js/Express backend with MongoDB database, developed for Nexora Company internship assignment.

🚀 Features Implemented
✅ Core Requirements
Product Catalog - Display 8 mock products with images, descriptions, and prices

Shopping Cart - Add/remove items, update quantities in real-time

Checkout Process - Customer information form with order summary

Order Confirmation - Receipt generation with order details

RESTful APIs - Complete backend API implementation

Responsive Design - Mobile-first responsive interface

Screenshot:

<img width="1895" height="1021" alt="Screenshot 2025-11-08 210606" src="https://github.com/user-attachments/assets/996ff97c-f552-4ff7-bcd7-0ddd8cd17676" />



<img width="1894" height="1017" alt="Screenshot 2025-11-08 210624" src="https://github.com/user-attachments/assets/093794ef-09b0-4e02-b1ee-e9f30195d6c6" />


<img width="1915" height="1016" alt="Screenshot 2025-11-08 210646" src="https://github.com/user-attachments/assets/40919947-67bf-4b4e-b0b1-535de2900648" />


<img width="1870" height="961" alt="Screenshot 2025-11-08 210658" src="https://github.com/user-attachments/assets/380c5c20-aa21-4f49-a44b-a446e3f8c9c0" />


✅ Backend APIs
GET /api/products - Fetch all products

POST /api/cart - Add item to cart

DELETE /api/cart/:id - Remove item from cart

GET /api/cart - Get cart contents with total

POST /api/checkout - Process checkout and generate receipt

✅ Bonus Features
MongoDB Persistence - Database integration with session management

Error Handling - Comprehensive error handling throughout the application

Modern UI/UX - Gradient designs, loading states, and smooth animations

Session Management - Persistent cart across browser sessions

🛠 Tech Stack
Frontend
React 18 - Modern React with hooks

Axios - HTTP client for API calls

CSS3 - Responsive design with Flexbox/Grid

Local Storage - Session persistence

Backend
Node.js - Runtime environment

Express.js - Web framework

MongoDB - Database with Mongoose ODM

CORS - Cross-origin resource sharing

UUID - Session ID generation

📁 Project Structure
text
vibe-commerce/
├── 📁 backend/
│   ├── 📁 models/
│   │   ├── Product.js
│   │   └── Cart.js
│   ├── 📁 routes/
│   │   ├── products.js
│   │   ├── cart.js
│   │   └── checkout.js
│   ├── 📁 scripts/
│   │   └── seed.js
│   ├── package.json
│   └── server.js
├── 📁 frontend/
│   ├── 📁 public/
│   │   └── index.html
│   ├── 📁 src/
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   └── package.json
└── README.md
⚙️ Setup Instructions
Prerequisites
Node.js (v14 or higher)

MongoDB (local installation or MongoDB Atlas)

Git

Step 1: Backend Setup
Navigate to backend directory

bash
cd backend
Install dependencies

bash
npm install
Setup MongoDB

Option A: Local MongoDB

bash
# Make sure MongoDB is running on localhost:27017
mongod
Option B: MongoDB Atlas (Cloud)

Update connection string in backend/server.js:

javascript
const MONGODB_URI = 'your-mongodb-atlas-connection-string';
Seed the database (optional)

bash
node scripts/seed.js
Start the backend server

bash
npm run dev
✅ Backend will run on: http://localhost:5000

Step 2: Frontend Setup
Open new terminal and navigate to frontend

bash
cd frontend
Install dependencies

bash
npm install
Start the React application

bash
npm start
✅ Frontend will run on: http://localhost:3000

Step 3: Access the Application
Main Application: http://localhost:3000

Backend API: http://localhost:5000

API Documentation: Available at http://localhost:5000/api

🎯 Usage Guide
For Users
Browse Products: View all available products on the main page

Add to Cart: Click "Add to Cart" on any product

View Cart: Click "Cart" in navigation to see cart items

Manage Quantities: Use +/- buttons to update quantities

Checkout: Fill in name and email, then place order

Order Confirmation: View receipt with order details

For Developers
API Testing: Use Postman or curl to test endpoints

Database: MongoDB collections auto-created on first run

Sessions: Cart data persists for 24 hours

Error Handling: Comprehensive error messages in console

🔧 API Endpoints Documentation
Products
http
GET /api/products
Response: Array of product objects
Cart
http
GET /api/cart
Headers: { 'session-id': 'your-session-id' }
Response: Cart object with items and total

POST /api/cart
Headers: { 'session-id': 'your-session-id' }
Body: { "productId": "string", "quantity": number }
Response: Updated cart

DELETE /api/cart/:id
Headers: { 'session-id': 'your-session-id' }
Response: Updated cart
Checkout
http
POST /api/checkout
Headers: { 'session-id': 'your-session-id' }
Body: {
  "name": "string",
  "email": "string",
  "cartItems": array
}
Response: Order receipt
📱 Screenshots & Features Explanation
🏠 Home Page - Products Grid
Layout: Responsive grid of product cards

Features:

Product images, names, descriptions, and prices

"Add to Cart" buttons with hover effects

Mobile-responsive design

Technology: CSS Grid, React components

🛒 Shopping Cart
Features:

Real-time quantity updates

Item removal functionality

Running total calculation

Empty cart state handling

Technology: React state management, API calls

💳 Checkout Process
Steps:

Customer information form (name, email)

Order summary display

Payment processing (mock)

Order confirmation

Validation: Form validation with required fields

📄 Order Receipt
Information Displayed:

Order ID and timestamp

Customer details

Itemized order list

Tax calculation

Grand total

Persistence: Cart cleared after successful order

🎨 Design & UI Features
Responsive Design
Mobile First: Optimized for mobile devices

Breakpoints: Responsive at 768px and 480px

Flexible Grid: Adapts to different screen sizes

Modern UI Elements
Gradient Backgrounds: Purple gradient theme

Smooth Animations: Hover effects and transitions

Loading States: Spinner animations during API calls

Error Handling: User-friendly error messages

Color Scheme
Primary: Purple gradient (#667eea to #764ba2)

Success: Green for actions (#48bb78)

Danger: Red for deletions (#c53030)

Neutral: Grays for text and backgrounds

🔄 Data Flow
Frontend Flow
App Initialization → Fetch products → Set session ID

User Actions → API calls → State updates → UI re-render

Cart Management → Local storage → Session persistence

Checkout Process → Form validation → Order submission → Receipt display

Backend Flow
Request Reception → Middleware processing → Route handling

Database Operations → Mongoose queries → Data validation

Response Generation → Error handling → JSON responses

🗄 Database Schema
Product Collection
javascript
{
  name: String,
  price: Number,
  description: String,
  image: String,
  category: String
}
Cart Collection
javascript
{
  sessionId: String,
  items: [{
    productId: ObjectId,
    quantity: Number,
    name: String,
    price: Number
  }],
  createdAt: Date
}
🚨 Error Handling
Frontend Errors
Network request failures

Form validation errors

Empty states handling

Backend Errors
Database connection issues

Invalid request data

Resource not found

Server errors with appropriate status codes

📈 Performance Features
Efficient Re-renders: React optimization with proper state management

API Optimization: Minimal database queries

Image Optimization: External CDN for product images

Code Splitting: React lazy loading ready

🔮 Future Enhancements
User authentication and profiles

Product search and filtering

Payment gateway integration

Order history and tracking

Product reviews and ratings

Inventory management

Admin dashboard

🐛 Troubleshooting
Common Issues
Backend not starting

Check if port 5000 is available

Verify MongoDB connection

Check console for error messages

Frontend connection issues

Verify backend is running on port 5000

Check CORS configuration

Verify API endpoints

Database issues

Ensure MongoDB is running

Check connection string

Verify database permissions

Debugging Tips
Check browser console for frontend errors

Monitor backend terminal for server logs

Use Postman to test API endpoints directly

Verify environment variables

📞 Support
For any issues during setup or development:

Check this README thoroughly

Verify all prerequisites are installed

Check console error messages

Ensure all services are running on correct ports

✅ Assignment Completion Status
Requirement	Status	Notes
Backend APIs	✅ Complete	All 5 endpoints implemented
Frontend React	✅ Complete	All components and features
MongoDB Integration	✅ Complete	Full database persistence
Responsive Design	✅ Complete	Mobile-first approach
Error Handling	✅ Complete	Comprehensive error management
Session Management	✅ Complete	Cart persistence
Mock Checkout	✅ Complete	Receipt generation
Code Quality	✅ Complete	Clean, documented code
Setup Instructions	✅ Complete	Detailed README
🎉 Project is fully complete and ready for submission!


