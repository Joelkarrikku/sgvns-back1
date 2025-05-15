const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    title: String,
    message: String,
    audience: { 
        type: String, 
        enum: ['All', 'Students', 'Teachers', 'Parents'], 
        default: 'All' 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

module.exports = mongoose.model('Notification', notificationSchema);
