const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const authRoutes = require('./Routes/routes/auth.routes');
const circularRoutes = require('./Routes/routes/circular.routes');
const notificationRoutes = require('./Routes/routes/notification.routes');
const eventRoutes = require('./Routes/routes/event.routes');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('MongoDB Error', err));

app.use('/api/auth', authRoutes);
app.use('/api/circulars', circularRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/events', eventRoutes);

// ✅ Always use dynamic port for local + Render compatibility
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
