const mongoose = require("mongoose");

const CircularSchema = new mongoose.Schema({
    title: String,
    description: String,
    audience: String,
    fileUrl: String, // ✅ Cloudinary PDF/Image URL
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Circular", CircularSchema);
