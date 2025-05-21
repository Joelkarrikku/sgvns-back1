const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    const isPdf = file.mimetype === "application/pdf";
    return {
      folder: "SGVNS-Docs",
      resource_type: isPdf ? "raw" : "image",
      format: isPdf ? "pdf" : undefined,
      public_id: file.originalname.split(".")[0],
      access_mode: "public", // <<< THIS is important
    };
  },
});

const upload = multer({ storage });
module.exports = upload;
