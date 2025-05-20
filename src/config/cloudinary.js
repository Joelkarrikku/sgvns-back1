const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
require("dotenv").config();

// ✅ Cloudinary Configuration (Verify Credentials)
if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
  console.error("⚠️ Cloudinary credentials missing in environment variables!");
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ✅ Enhanced Cloudinary Storage Configuration
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const allowedMimeTypes = ["application/pdf"];
    if (!allowedMimeTypes.includes(file.mimetype)) {
      throw new Error("❌ Invalid file type. Only PDFs are allowed.");
    }

    return {
      folder: "circulars",
      resource_type: "raw", // Use 'raw' for PDFs
      format: "pdf", // Force PDF format
      public_id: file.originalname.replace(/\.[^/.]+$/, ""), // Remove file extension for better readability
      use_filename: true, // Retain original filename
      unique_filename: false, // Prevent Cloudinary from altering names
      overwrite: true, // Allow files to be updated if re-uploaded
      transformation: [{ quality: "auto" }], // Auto-optimize quality to reduce storage usage
    };
  },
});

// ✅ Multer Upload Middleware with File Limits
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 10MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== "application/pdf") {
      return cb(new Error("❌ Only PDF files are allowed."), false);
    }
    cb(null, true);
  }
});

// ✅ Export Cloudinary and Multer Configurations
module.exports = { cloudinary, storage, upload };
