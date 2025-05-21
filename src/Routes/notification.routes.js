const express = require("express");
const router = express.Router();
const Notification = require("../models/notification.model");
const upload = require("../Middlewares/upload.middleware");
const { verifyToken, authorizeRole } = require("../Middlewares/auth.middleware");

// GET all notifications
router.get("/", async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ createdAt: -1 });
    res.json(notifications);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ error: "Failed to fetch notifications." });
  }
});

// POST a notification with optional file (Admin only)
router.post("/", verifyToken, authorizeRole("Admin"), upload.single("attachment"), async (req, res) => {
  try {
    const { message, recipient, type } = req.body;

    if (!message || !recipient) {
      return res.status(400).json({ message: "Message and recipient are required." });
    }

    const notification = new Notification({
      message,
      recipient,
      type: type || "info",
      attachmentUrl: req.file?.path || null,
    });

    await notification.save();
    res.status(201).json({ message: "Notification sent successfully!", notification });
  } catch (error) {
    console.error("Error creating notification:", error);
    res.status(500).json({ message: "Failed to send notification." });
  }
});

// DELETE a notification (Admin only)
router.delete("/:id", verifyToken, authorizeRole("Admin"), async (req, res) => {
  try {
    const notification = await Notification.findByIdAndDelete(req.params.id);
    if (!notification) {
      return res.status(404).json({ error: "Notification not found." });
    }

    res.json({ message: "Notification deleted successfully." });
  } catch (error) {
    console.error("Error deleting notification:", error);
    res.status(500).json({ error: "Failed to delete notification." });
  }
});

module.exports = router;
