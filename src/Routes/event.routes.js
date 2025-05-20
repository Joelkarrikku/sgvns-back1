const express = require("express");
const router = express.Router();
const upload = require("../Middlewares/upload.middleware");
const { verifyToken, verifyRole, isAdmin } = require("../Middlewares/auth.middleware");
const Event = require("../models/event.model");

// ✅ GET All Events (Public)
router.get("/", async (req, res) => {
    try {
        const events = await Event.find().sort({ date: -1 });
        res.json(events);
    } catch (error) {
        console.error("Error fetching events:", error);
        res.status(500).json({ error: "Failed to fetch events." });
    }
});

// ✅ POST: Upload New Event (Admin Only)
router.post("/upload", verifyToken, verifyRole("admin"), upload.single("image"), async (req, res) => {
    try {
        const { title, description } = req.body;

        // Validate input
        if (!title || !description) {
            return res.status(400).json({ error: "Title and description are required." });
        }

        // Create new event
        const event = new Event({
            title,
            description,
            imageUrl: req.file ? `/uploads/${req.file.filename}` : null,
        });

        await event.save();
        res.status(201).json({ message: "Event uploaded successfully!", event });
    } catch (error) {
        console.error("Error creating event:", error);
        res.status(400).json({ error: "Failed to create event." });
    }
});

// ✅ DELETE: Remove an Event (Admin Only)
router.delete("/:id", verifyToken, verifyRole("admin"), async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ error: "Event not found." });
        }

        await Event.findByIdAndDelete(req.params.id);
        res.json({ message: "Event deleted successfully." });
    } catch (error) {
        console.error("Error deleting event:", error);
        res.status(400).json({ error: "Failed to delete event." });
    }
});

module.exports = router;
