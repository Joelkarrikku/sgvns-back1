const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload.middleware');
const verifyAdmin = require('../middlewares/admin.middleware');
const Notification =require('../models/notification.model');
//const authController = require('../../Controllers/auth.controller');
// Public: Get all notifications
router.get('/', async (req, res) => {
    try {
        const notifications = await Notification.find().sort({ date: -1 });
        res.json(notifications);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch notifications' });
    }
});

// Admin: Post new notification (supports attachment)
router.post('/', verifyAdmin, upload.single('attachment'), async (req, res) => {
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

// Admin: Delete notification
router.delete('/:id', verifyAdmin, async (req, res) => {
    try {
        await Notification.findByIdAndDelete(req.params.id);
        res.json({ message: 'Notification deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: 'Failed to delete notification' });
    }
});

module.exports = router;
