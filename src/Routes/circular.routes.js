const express = require('express');
const router = express.Router();
const upload = require('../Middlewares/upload.middleware');
const Circular = require('../models/circular.model');
const { verifyToken, verifyRole } = require('../Middlewares/auth.middleware');

// POST route to upload a circular
router.post(
  '/upload',
  verifyToken,
  verifyRole('Admin'),
  upload.single('file'),
  async (req, res) => {
    try {
      const { title, description, audience } = req.body;
      const fileUrl = req.file ? req.file.path : null;

      const newCircular = new Circular({
        title,
        description,
        audience,
        attachmentUrl: fileUrl,  // ✅ updated key name to match schema
      });

      await newCircular.save();
      res.status(201).json({ message: 'Circular uploaded successfully', circular: newCircular });
    } catch (error) {
      res.status(500).json({ message: 'Error uploading circular', error: error.message });
    }
  }
);

// GET all circulars
router.get('/', async (req, res) => {
  try {
    const circulars = await Circular.find().sort({ publishedAt: -1 });
    res.json(circulars);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving circulars', error: error.message });
  }
});

module.exports = router;
