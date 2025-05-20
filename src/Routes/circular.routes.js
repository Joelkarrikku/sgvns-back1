const express = require("express");
const router = express.Router();
const Circular = require("../models/circular.model");
const { verifyToken, isAdmin } = require("../Middlewares/auth.middleware");
const  upload  = require("../Middlewares/upload.middleware");
const {uploadCircular } = require("../Controllers/circular.controller");

// ✅ GET All Circulars (Public)
router.get("/", async (req, res) => {
    try {
        const circulars = await Circular.find().sort({ createdAt: -1 });
        res.json(circulars);
    } catch (error) {
        console.error("Error fetching circulars:", error);
        res.status(500).json({ message: "Failed to fetch circulars." });
    }
});

// ✅ POST: Upload New Circular (Admin Only)
router.post("/upload", verifyToken, isAdmin,upload.single("file"), async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: "No file uploaded." });

        const circular = new Circular({
            title: req.body.title,
            description: req.body.description,
            audience: req.body.audience,
            fileUrl: req.file.path, // ✅ Cloudinary URL
        });

        await circular.save();
        res.status(201).json({ message: "Circular uploaded successfully!", circular });
    } catch (error) {
        res.status(500).json({ message: "Failed to create circular." });
    }
});

// ✅ DELETE: Remove a Circular (Admin Only)
router.delete("/:id", verifyToken, isAdmin, async (req, res) => {
    try {
        const circular = await Circular.findById(req.params.id);
        if (!circular) {
            return res.status(404).json({ message: "Circular not found." });
        }

        await Circular.findByIdAndDelete(req.params.id);
        res.json({ message: "Circular deleted successfully." });
    } catch (error) {
        console.error("Error deleting circular:", error);
        res.status(500).json({ message: "Failed to delete circular." });
    }
});

module.exports = router;
