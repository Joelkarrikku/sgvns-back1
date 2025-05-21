const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema({
    message: String,
    recipient: String, // "all" or specific user ID
    type: { type: String, enum: ["info", "alert", "update"], default: "info" },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("notification", NotificationSchema);
