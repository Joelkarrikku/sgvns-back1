const express = require('express');
const router = express.Router();
const { verifyToken, isAdmin } = require('../middlewares/auth.middleware');
const upload = require('../config/cloudinary');
const Circular = require('../models/circular.model');

// @route   POST /api/circulars
// @desc    Create a circular (Admin only)
// @access  Private
router.post(
  '/',
  verifyToken,
  isAdmin,
  upload.single('file'),
  async (req, res) => {
    try {
      const { title, description, audience } = req.body;
      const file = req.file;

      if (!title || !description || !file) {
        return res.status(400).json({ message: 'Title, description, and file are required.' });
      }

      const newCircular = new Circular({
        title,
        description,
        audience: audience || 'All',
        file: file.originalname,
        attachmentUrl: file.path,
      });

      await newCircular.save();
      res.status(201).json({ message: 'Circular created successfully', circular: newCircular });
    } catch (error) {
      console.error('Error creating circular:', error);
      res.status(500).json({ message: 'Server Error' });
    }
  }
);

// @route   GET /api/circulars
// @desc    Get all circulars (Public)
// @access  Public
router.get('/', async (req, res) => {
  try {
    const circulars = await Circular.find().sort({ createdAt: -1 });
    res.status(200).json(circulars);
  } catch (error) {
    console.error('Error fetching circulars:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
