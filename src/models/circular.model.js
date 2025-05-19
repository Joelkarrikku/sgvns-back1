const mongoose = require('mongoose');

const circularSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  attachmentUrl: { // Cloudinary file URL
    type: String,
    required: true
  },
  audience: {
    type: String,
    enum: ['All', 'Students', 'Teachers', 'Parents'],
    default: 'All',
    required: true
  },
  publishedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Circular', circularSchema);
