const mongoose = require('mongoose');

const circularSchema = new mongoose.Schema({
  title: String,
  description: String,
  audience: { type: String, default: 'All' },
  file: String,
  attachmentUrl: String,
}, { timestamps: true });

module.exports = mongoose.model('Circular', circularSchema);
