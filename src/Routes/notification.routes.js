const express = require("express");
const router = express.Router();
const Notification = require("../models/notification.model");
const upload = require("../Middlewares/upload.middleware");
const { verifyToken, verifyRole, isAdmin } = require("../Middlewares/auth.middleware");


// ✅ GET All Notifications (Public)
router.get("/", async (req, res) => {
    try {
        const notifications = await Notification.find().sort({ date: -1 });
        res.json(notifications);
    } catch (error) {
        console.error("Error fetching notifications:", error);
        res.status(500).json({ error: "Failed to fetch notifications" });
    }
});

// ✅ POST: Upload New Notification (Admin Only)
router.post("/send", verifyToken, verifyRole("admin"), async (req, res) => {
    try {
        const notification = new Notification({
            message: req.body.message,
            recipient: req.body.recipient,
            type: req.body.type || "info",
        });

        await notification.save();
        res.status(201).json({ message: "Notification sent successfully!", notification });
    } catch (error) {
        res.status(500).json({ message: "Failed to send notification." });
    }
});

// ✅ DELETE: Remove a Notification (Admin Only)
router.delete("/:id", verifyToken, verifyRole("admin"), async (req, res) => {
    try {
        const notification = await Notification.findById(req.params.id);
        if (!notification) {
            return res.status(404).json({ error: "Notification not found." });
        }

        await Notification.findByIdAndDelete(req.params.id);
        res.json({ message: "Notification deleted successfully." });
    } catch (error) {
        console.error("Error deleting notification:", error);
        res.status(400).json({ error: "Failed to delete notification." });
    }
});

module.exports = router;
