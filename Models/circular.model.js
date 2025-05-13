const mongoose = require('mongoose'); // ✅ You missed this line

const circularSchema = new mongoose.Schema({
    title: String,
    description: String,
    attachmentUrl: String,
    audience: { type: String, enum: ['All', 'Students', 'Teachers', 'Parents'], default: 'All' },
    publishedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Circular', circularSchema);
