const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Import routes
const authRoutes = require('./Routes/auth.routes');
const circularRoutes = require('./Routes/circular.routes');
const notificationRoutes = require('./Routes/notification.routes');
const eventRoutes = require('./Routes/event.routes');

// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads')); // Serves uploaded files

// Sample root route to confirm server is working
app.get('/', (req, res) => {
    res.send('✅ Backend is running!');
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB Connected'))
.catch(err => console.error('❌ MongoDB Connection Error:', err));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/circulars', circularRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/events', eventRoutes);

// Start server on dynamic port for deployment compatibility
const PORT = process.env.PORT || 8000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Server running on port ${PORT}`);
});
