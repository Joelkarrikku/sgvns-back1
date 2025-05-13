const Notification = require('../Models/notification.model');

exports.createNotification = async (req, res) => {
  try {
    const { title, message, audience } = req.body;
    const notification = new Notification({ title, message, audience });
    await notification.save();
    res.status(201).json(notification);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ createdAt: -1 });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.markAsRead = async (req, res) => {
  try {
    const notificationId = req.params.id;
    const notification = await Notification.findById(notificationId);

    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    notification.status = 'Read';
    await notification.save();

    res.status(200).json({ message: 'Notification marked as read', notification });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
