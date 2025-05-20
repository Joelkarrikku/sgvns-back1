const mongoose = require("mongoose");

const CircularSchema = new mongoose.Schema({
    title: String,
    description: String,
    audience: String,
    fileUrl: String, // ✅ Store Cloudinary PDF URL here
});

module.exports = mongoose.model("Circular", CircularSchema);
