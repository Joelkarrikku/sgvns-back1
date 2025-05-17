const express = require('express');
const router = express.Router();
const upload = require('../Middlewares/upload.middleware');
const { verifyToken, verifyRole } = require('../Middlewares/auth.middleware');
const Notification = require('../models/notification.model');

// Public: Get all notifications
router.get('/', async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ date: -1 });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch notifications' });
  }
});

// Admin: Upload a new notification
router.post('/upload', verifyToken, verifyRole('Admin'), upload.single('attachment'), async (req, res) => {
  try {
    const notification = new Notification({
      title: req.body.title,
      message: req.body.message,
      attachmentUrl: req.file ? `/uploads/${req.file.filename}` : null
    });
    await notification.save();
    res.status(201).json(notification);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create notification' });
  }
});

// Admin: Delete a notification
router.delete('/:id', verifyToken, verifyRole('Admin'), async (req, res) => {
  try {
    await Notification.findByIdAndDelete(req.params.id);
    res.json({ message: 'Notification deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete notification' });
  }
});

module.exports = router;
