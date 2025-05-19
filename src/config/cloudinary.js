// src/config/cloudinary.js
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Configure Cloudinary with environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Define storage settings
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'circulars', // You can change this folder name
    allowed_formats: ['jpg', 'png', 'pdf', 'jpeg'],
    resource_type: 'auto'
  },
});

module.exports = { cloudinary, storage };
