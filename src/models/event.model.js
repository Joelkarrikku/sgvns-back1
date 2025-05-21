const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: String,
  location: String,
  bannerUrl: String,
  bannerPublicId: String
});

module.exports = mongoose.model("Event", eventSchema);
