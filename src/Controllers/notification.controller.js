const Notification = require('../models/Notification');
const path = require('path');
const fs = require('fs');

// @desc    Get all notifications
// @route   GET /api/notifications
exports.getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ publishedAt: -1 });

    const formatted = notifications.map((item) => ({
      _id: item._id,
      title: item.title,
      message: item.message,
      date: item.publishedAt,
      attachmentUrl: item.attachment ? `/uploads/${item.attachment}` : null,
    }));

    res.json(formatted);
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc    Create a new notification (with optional attachment)
// @route   POST /api/notifications/upload
exports.createNotification = async (req, res) => {
  try {
    const { title, message } = req.body;
    const attachment = req.file ? req.file.filename : null;

    if (!title || !message) {
      return res.status(400).json({ error: 'Title and message are required' });
    }

    const newNotification = new Notification({
      title,
      message,
      attachment,
      publishedAt: new Date(),
    });

    const savedNotification = await newNotification.save();

    res.status(201).json({
      message: 'Notification uploaded successfully',
      notification: {
        _id: savedNotification._id,
        title: savedNotification.title,
        message: savedNotification.message,
        date: savedNotification.publishedAt,
        attachmentUrl: savedNotification.attachment
          ? `/uploads/${savedNotification.attachment}`
          : null,
      },
    });
  } catch (error) {
    console.error('Error uploading notification:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc    Delete a notification
// @route   DELETE /api/notifications/:id
exports.deleteNotification = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);

    if (!notification) {
      return res.status(404).json({ error: 'Notification not found' });
    }

    // Delete attached file if exists
    if (notification.attachment) {
      const filePath = path.join(__dirname, '..', 'uploads', notification.attachment);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await Notification.findByIdAndDelete(req.params.id);

    res.json({ message: 'Notification deleted successfully' });
  } catch (error) {
    console.error('Error deleting notification:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
