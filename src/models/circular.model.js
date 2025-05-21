const mongoose = require("mongoose");

const circularSchema = new mongoose.Schema({
  title: String,
  description: String,
  audience: String,
  fileUrl: String,
  filePublicId: String
});

module.exports = mongoose.model("Circular", circularSchema);
