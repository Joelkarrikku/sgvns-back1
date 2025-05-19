const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import routes
const authRoutes = require('./Routes/auth.routes');
const circularRoutes = require('./Routes/circular.routes');
const notificationRoutes = require('./Routes/notification.routes');
const eventRoutes = require('./Routes/event.routes');

// Initialize express app
const app = express();

// Middleware
app.use(cors({
    origin: ['https://sgvns-front.netlify.app'], // Allow Netlify frontend
    credentials: true // Allow cookies and authorization headers
}));
app.use(express.json());
app.use('/uploads', express.static('uploads')); // Serve uploaded files

// Health check route
app.get('/', (req, res) => {
    res.send('✅ Backend is running!');
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('✅ MongoDB Connected');
})
.catch(err => {
    console.error('❌ MongoDB Connection Error:', err);
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/circulars', circularRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/events', eventRoutes);

console.log('✅ Routes loaded: /api/auth, /api/circulars, /api/notifications, /api/events');

// Global error handling
process.on('uncaughtException', err => {
    console.error('❌ Uncaught Exception:', err);
});
process.on('unhandledRejection', err => {
    console.error('❌ Unhandled Rejection:', err);
});

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Server running on port ${PORT}`);
});
