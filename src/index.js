const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from .env
dotenv.config();

// Initialize express app
const app = express();

// CORS Setup: Allow Netlify and localhost
app.use(cors({
  origin: ['https://sgvns-front.netlify.app', 'http://localhost:3000'],
  credentials: true
}));

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (for legacy access to uploaded files)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/circulars', circularRoutes);
// Health check route
app.get('/', (req, res) => {
  res.send('✅ Backend is running!');
});

// Import Routes
const authRoutes = require('./Routes/auth.routes');
const circularRoutes = require('./Routes/circular.routes');
const notificationRoutes = require('./Routes/notification.routes');
const eventRoutes = require('./Routes/event.routes');

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/circulars', circularRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/events', eventRoutes);

console.log('✅ Routes loaded: /api/auth, /api/circulars, /api/notifications, /api/events');

// Connect to MongoDB and start server
const MONGO_URI = process.env.MONGO_URL;
const PORT = process.env.PORT || 8000;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ MongoDB Connected');
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
})
.catch(err => {
  console.error('❌ MongoDB Connection Error:', err);
});

// Global error handling
process.on('uncaughtException', err => {
  console.error('❌ Uncaught Exception:', err);
});
process.on('unhandledRejection', err => {
  console.error('❌ Unhandled Rejection:', err);
});
