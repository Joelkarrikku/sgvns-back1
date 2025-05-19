// src/middlewares/upload.middleware.js
const multer = require('multer');
const { storage } = require('../config/cloudinary'); // Cloudinary storage

const upload = multer({ storage }); // Use Cloudinary storage

module.exports = upload;
