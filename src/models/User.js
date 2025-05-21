const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['Admin', 'Staff', 'Teacher', 'Student'],
    default: 'Admin'
  }
}, {
  timestamps: true
});

// Prevent model overwrite on hot reloads (especially in development)
module.exports = mongoose.models.User || mongoose.model('User', userSchema);
