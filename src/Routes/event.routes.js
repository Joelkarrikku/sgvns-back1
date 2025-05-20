const express = require('express');
const router = express.Router();
const upload = require('../Middlewares/upload.middleware');
const { verifyToken, isAdmin } = require('../Middlewares/auth.middleware');
const Event = require('../models/event.model');

// Public: Get all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find().sort({ date: -1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

// Admin: Upload new event
router.post('/upload', verifyToken, verifyRole('Admin'), upload.single('image'), async (req, res) => {
  try {
    const event = new Event({
      title: req.body.title,
      description: req.body.description,
      imageUrl: req.file ? `/uploads/${req.file.filename}` : null
    });
    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create event' });
  }
});

// Admin: Delete event
router.delete('/:id', verifyToken, verifyRole('Admin'), async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete event' });
  }
});

module.exports = router;
