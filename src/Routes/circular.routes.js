const express = require("express");
const router = express.Router();
const Circular = require("../models/circular.model");
const { isAdmin } = require('../Middlewares/auth.middleware'); // ✅ Ensure correct import
const cloudinary = require("../config/cloudinary").cloudinary; // ✅ Ensure Cloudinary is properly imported
const { upload } = require("../config/cloudinary"); // ✅ Ensure this exists

// ✅ GET Circulars (Public)
router.get("/", async (req, res) => {
    try {
        const circulars = await Circular.find().sort({ createdAt: -1 });
        res.json(circulars);
    } catch (err) {
        console.error("Error fetching circulars:", err);
        res.status(500).json({ message: "Failed to fetch circulars." });
    }
});

// ✅ POST Circular (Admin) - Upload PDF to Cloudinary
router.post("/", isAdmin, upload.single("file"), async (req, res) => {
    try {
        const { title, description, audience } = req.body;

        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded." });
        }

        // ✅ Upload PDF to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, {
            resource_type: "raw",
            folder: "circulars"
        });

        // ✅ Store Cloudinary URL in Database
        const circular = new Circular({
            title,
            description,
            audience,
            fileUrl: result.secure_url, // ✅ Use Cloudinary URL
        });

        await circular.save();
        res.status(201).json({ message: "Circular uploaded successfully!", circular });
    } catch (err) {
        console.error("Circular upload error:", err);
        res.status(500).json({ message: "Failed to create circular." });
    }
});

module.exports = router;
