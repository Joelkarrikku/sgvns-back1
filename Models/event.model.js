
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: String,
    description: String,
    eventDate: Date,
    location: String,
    // Support multiple images
    images: [String], // array of image URLs or folder links
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

module.exports = mongoose.model('Event', eventSchema);
