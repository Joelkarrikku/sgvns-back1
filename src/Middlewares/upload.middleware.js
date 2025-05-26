const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const isPdf = file.mimetype === "application/pdf";
    return {
      folder: "SGVNS-Docs",
      resource_type: isPdf ? "raw" : "image", // 'raw' for PDFs, 'image' for JPG/PNG
      format: isPdf ? "pdf" : undefined,
      public_id: `${Date.now()}-${file.originalname.split(".")[0]}`,
      // ❌ DO NOT set access_mode
      // ✅ Default access is public — nothing else needed
    };
  },
});

const upload = multer({ storage });
module.exports = upload;
