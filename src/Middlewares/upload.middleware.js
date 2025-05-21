// src/Middlewares/upload.middleware.js
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const cloudinary = require('../config/cloudinary'); // ✅ Correct path

const storage = new CloudinaryStorage({
  cloudinary, // ✅ already v2 instance
  params: {
    folder: 'sgvns_uploads', // customize folder as needed
    allowed_formats: ['jpg', 'png', 'jpeg', 'pdf'],
    public_id: (req, file) => {
      return `${Date.now()}-${file.originalname}`; // Optional: unique name
    },
  },
});

const upload = multer({ storage });

module.exports = upload;
