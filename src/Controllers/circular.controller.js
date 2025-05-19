const express = require('express');
const router = express.Router();
const upload = require('../config/cloudinary'); // ✅ Correct path
const { verifyToken, isAdmin } = require('../middlewares/auth.middleware');
const Circular = require('../Models/circular.model');
const Circular = require('../Models/circular.model');

const Circular = require('../Models/circular.model');

exports.addCircular = async (req, res) => {
  try {
    const { title, description, audience } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const newCircular = new Circular({
      title,
      description,
      audience,
      attachmentUrl: req.file.path,
      file: req.file.originalname,
    });

    await newCircular.save();

    res.status(201).json({
      message: 'Circular uploaded successfully',
      circular: newCircular,
    });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ error: 'Server error uploading circular' });
  }
};

module.exports = router;
