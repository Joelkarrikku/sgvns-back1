const express = require('express');
const router = express.Router();
const Circular = require('../models/Circular');
const { isAdmin } = require('../middlewares/auth');
const multer = require('multer');
const { storage } = require('../config/cloudinary');
const upload = multer({ storage });

// GET circulars (Public)
router.get('/', async (req, res) => {
  try {
    const circulars = await Circular.find().sort({ createdAt: -1 });
    res.json(circulars);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch circulars.' });
  }
});

// POST circular (Admin)
router.post('/', isAdmin, upload.single('file'), async (req, res) => {
  try {
    const { title, description, audience } = req.body;
    const fileUrl = req.file?.path;

    const circular = new Circular({
      title,
      description,
      audience,
      fileUrl,
    });

    await circular.save();
    res.status(201).json(circular);
  } catch (err) {
    console.error('Circular upload error:', err);
    res.status(500).json({ message: 'Failed to create circular.' });
  }
});

module.exports = router;
