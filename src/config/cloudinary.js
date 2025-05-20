// config/cloudinary.js
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
require('dotenv').config();

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Cloudinary storage configuration for PDFs
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'circulars',
    resource_type: 'raw', // use 'raw' for PDFs and other non-image files
    format: async (req, file) => 'pdf', // force pdf format
    public_id: (req, file) => file.originalname.split('.')[0], // use filename as public ID
  },
});

// Export multer middleware
const upload = multer({ storage });

module.exports = {
  cloudinary,
  storage,
};
