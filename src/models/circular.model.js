const mongoose = require("mongoose");

const CircularSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    audience: {
      type: String,
      required: true,
      enum: ["Students", "Teachers", "Staff", "All"], // optional: if you want controlled values
    },
    fileUrl: {
      type: String,
      required: true,
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // optional: track which Admin uploaded it
    },
  },
  {
    timestamps: true, // ✅ Automatically adds createdAt and updatedAt
  }
);

module.exports = mongoose.model("Circular", CircularSchema);
