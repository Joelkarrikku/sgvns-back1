// cloudinaryConfig.js
require("dotenv").config(); // ✅ Load environment variables FIRST

const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

// ✅ Check Cloudinary Credentials
const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;

if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
  throw new Error("❌ Missing Cloudinary credentials in .env file or environment variables.");
}

// ✅ Configure Cloudinary
cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

// ✅ Verify uploader method is available
if (typeof cloudinary.uploader.upload_stream !== "function") {
  throw new Error("❌ cloudinary.uploader.upload_stream is undefined. Check Cloudinary setup.");
}

// ✅ Cloudinary Storage with PDF Restriction
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const allowedMimeTypes = ["application/pdf"];
    if (!allowedMimeTypes.includes(file.mimetype)) {
      throw new multer.MulterError("LIMIT_UNEXPECTED_FILE", "❌ Invalid file type. Only PDFs are allowed.");
    }

    return {
      folder: "circulars",
      resource_type: "raw", // Use 'raw' for non-image files like PDFs
      format: "pdf",
      public_id: file.originalname.replace(/\.[^/.]+$/, ""), // Remove extension
      use_filename: true,
      unique_filename: false,
      overwrite: true,
      transformation: [{ quality: "auto" }],
    };
  },
});

// ✅ Multer Upload Middleware
const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== "application/pdf") {
      return cb(new Error("❌ Only PDF files are allowed."), false);
    }
    cb(null, true);
  },
});

// ✅ Export Cloudinary and Multer
module.exports = {
  cloudinary,
  storage,
  upload,
};
