// src/utils/makePublic.js
const cloudinary = require('../config/cloudinary'); // Adjust path if needed

const makeFilePublic = async () => {
  try {
    const publicId = "SGVNS-Docs/filename"; // Update with correct Cloudinary public_id (folder/filename without extension)

    const result = await cloudinary.api.update(publicId, {
      access_mode: "public",
      resource_type: "raw", // For PDFs and other non-image files
    });

    console.log("✅ File is now public:", result);
  } catch (error) {
    console.error("❌ Failed to update file access:", error);
  }
};

makeFilePublic();
