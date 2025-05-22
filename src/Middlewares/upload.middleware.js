const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const isPdf = file.mimetype === "application/pdf";
    return {
      folder: "SGVNS-Docs",
      resource_type: isPdf ? "raw" : "image",
      format: isPdf ? "pdf" : undefined,
      public_id: `${Date.now()}-${file.originalname.split(".")[0]}`,
      access_mode: "public", // ✅ Ensures file is publicly accessible
    };
  },
});

const upload = multer({ storage });
module.exports = upload;


