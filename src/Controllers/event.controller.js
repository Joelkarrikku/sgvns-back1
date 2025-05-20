const Event = require('../models/event.model');

// Create event (Admin only)
const createEvent = async (req, res) => {
    try {
        const event = new Event({
            title: req.body.title,
            description: req.body.description,
            date: req.body.date,
            location: req.body.location,
        });

        await event.save();
        res.status(201).json({ message: "Event created successfully!", event });
    } catch (error) {
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
