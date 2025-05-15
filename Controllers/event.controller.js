const Event = require('../models/event.model');

exports.createEvent = async (req, res) => {
  try {
    const { title, description, eventDate, location } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';
    const event = new Event({ title, description, eventDate, location, imageUrl });
    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ eventDate: 1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.getUpcomingEvents = async (req, res) => {
  try {
    const today = new Date();
    const events = await Event.find({ eventDate: { $gte: today } }).sort({ eventDate: 1 });

    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
