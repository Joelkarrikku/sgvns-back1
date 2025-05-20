const Event = require('../models/event.model');

// Create event (Admin only)
const createEvent = async (req, res) => {
    try {
        console.log("🔍 Incoming request body:", req.body);
        console.log("🔍 Incoming file:", req.file);

        if (!req.file) return res.status(400).json({ message: "No file uploaded." });

        const event = new Event({
            title: req.body.title,
            description: req.body.description,
            date: req.body.date,
            location: req.body.location,
            eventBannerUrl: req.file.path, // ✅ Cloudinary image URL
        });

        await event.save();
        console.log("✅ Event saved:", event);
        res.status(201).json({ message: "Event created successfully!", event });
    } catch (error) {
        console.error("❌ Error creating event:", error);
        res.status(500).json({ message: "Failed to create event.", error });
    }
};

module.exports = { createEvent };


// Get all events (Public)
exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      message: 'Events fetched successfully',
      data: events,
    });
  } catch (error) {
    console.error('Get Events Error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};
