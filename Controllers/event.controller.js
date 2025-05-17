const Event = require('../models/event.model');

// Create event (Admin only)
exports.createEvent = async (req, res) => {
  try {
    const { title, description, date } = req.body;
    const file = req.file ? req.file.filename : null;

    const event = new Event({ title, description, date, file });
    await event.save();

    res.status(201).json({
      success: true,
      message: 'Event created successfully',
      data: event,
    });
  } catch (error) {
    console.error('Create Event Error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

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
