const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary"); // ✅ Correct path

const storage = new CloudinaryStorage({
    cloudinary,
    params: async (req, file) => {
        let folderName = "default"; // ✅ Default folder

        // 📌 Dynamically set folder based on route (circulars, notifications, events)
        if (req.baseUrl.includes("/circulars")) folderName = "circulars";
        if (req.baseUrl.includes("/notifications")) folderName = "notifications";
        if (req.baseUrl.includes("/events")) folderName = "events";

        return {
            folder: folderName,
            resource_type: "auto", // ✅ Allows different file types (PDF, JPG, PNG)
            allowedFormats: ["pdf", "jpg", "png"], // ✅ Ensures Cloudinary accepts only these formats
        };
    },
});

const upload = multer({ storage });

module.exports = upload; // ✅ Exporting without `{}` to avoid destructuring issues
