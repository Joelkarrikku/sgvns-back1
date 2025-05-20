const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from .env
dotenv.config();

// Initialize express app
const app = express();

// ✅ Import Routes BEFORE using them
const authRoutes = require('./Routes/auth.routes');
const circularRoutes = require('./Routes/circular.routes');
const notificationRoutes = require('./Routes/notification.routes');
const eventRoutes = require('./Routes/event.routes');

// CORS Setup: Allow Netlify and localhost
app.use(cors({
  origin: ['https://sgvns-front.netlify.app', 'http://localhost:3000'],
  credentials: true
}));

// Middleware to parse JSON and URL-encoded data
app.use(express.json()); // ✅ Allows JSON body parsing
app.use(express.urlencoded({ extended: true }))

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ Use Routes AFTER they are properly imported
app.use('/api/auth', require("./Routes/auth.routes"));
app.use('/api/circulars',require("./Routes/circular.routes"));
app.use('/api/notifications', require("./Routes/notification.routes"));
app.use('/api/events', require("./Routes/event.routes"));

// Health check route
app.get('/', (req, res) => {
  res.send('✅ Backend is running!');
});

console.log('✅ Routes loaded: /api/auth, /api/circulars, /api/notifications, /api/events');
app.listen(8000, () => console.log("Server running on port 8000"));
// ✅ Connect to MongoDB
const MONGO_URI = process.env.MONGO_URL;
const PORT = process.env.PORT ;

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
