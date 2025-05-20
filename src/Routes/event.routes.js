const express = require("express");
const router = express.Router();
const Event = require("../models/event.model");
const upload = require("../Middlewares/upload.middleware");
const { verifyToken, verifyRole } = require("../Middlewares/auth.middleware");

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

// ✅ POST: Create New Event (Admin Only)
router.post("/upload", verifyToken, verifyRole("admin"), upload.single("eventBanner"), async (req, res) => {
    try {
        const { title, description, date, location } = req.body;

        if (!title || !date || !location) {
            return res.status(400).json({ message: "Title, date, and location are required." });
        }

        if (!req.file) {
            return res.status(400).json({ message: "Event banner image is required." });
        }

        const event = new Event({
            title,
            description,
            date,
            location,
            eventBannerUrl: req.file.path, // Cloudinary path
        });

        await event.save();
        res.status(201).json({ message: "Event created successfully!", event });
    } catch (error) {
        console.error("Error creating event:", error);
        res.status(500).json({ message: "Failed to create event." });
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
        res.status(500).json({ error: "Failed to delete event." });
    }
});

module.exports = router;
