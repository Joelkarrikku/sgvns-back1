const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  message: String,
  recipient: String,
  type: String,
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Notification", notificationSchema);
