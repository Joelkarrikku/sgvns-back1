const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
    title: String,
    description: String,
    date: Date,
    location: String,
    eventBannerUrl: String, // ✅ Cloudinary Event Poster/Image
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("event", EventSchema);
