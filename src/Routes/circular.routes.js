const express = require('express');
const router = express.Router();
const Circular = require('../models/circular.model');
const { verifyToken, authorizeRole } = require('../Middlewares/auth.middleware');
const upload = require('../Middlewares/upload.middleware'); // multer + cloudinary
const authenticateAdmin = require('../Middlewares/admin.middleware');

// ✅ Create Circular - Admin only
router.post(
  '/',
 
  upload.single('file'),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded.' });
      }

      const { title, description, audience } = req.body;

      if (!title || !description || !audience) {
        return res.status(400).json({
          message: 'Title, description, and audience are required.',
        });
      }

      const circular = new Circular({
        title,
        description,
        audience,
        fileUrl: req.file.path, // Cloudinary file URL
      });

      await circular.save();

      res.status(201).json({
        message: 'Circular uploaded successfully!',
        circular,
      });
    } catch (error) {
      console.error('Error uploading circular:', error);
      res.status(500).json({ message: 'Failed to create circular.' });
    }
  }
);

// ✅ Get All Circulars - Public access or role-based if needed
router.get('/', async (req, res) => {
  try {
    const circulars = await Circular.find().sort({ createdAt: -1 });
    res.status(200).json(circulars);
  } catch (error) {
    console.error('Error fetching circulars:', error);
    res.status(500).json({ message: 'Failed to fetch circulars.' });
  }
});

// ✅ Get a Single Circular by ID
router.get('/:id', async (req, res) => {
  try {
    const circular = await Circular.findById(req.params.id);
    if (!circular) {
      return res.status(404).json({ message: 'Circular not found.' });
    }
    res.status(200).json(circular);
  } catch (error) {
    console.error('Error fetching circular:', error);
    res.status(500).json({ message: 'Failed to fetch circular.' });
  }
});

// ✅ Delete Circular - Admin only
router.delete('/:id', verifyToken, authorizeRole('Admin'), async (req, res) => {
  try {
    const circular = await Circular.findByIdAndDelete(req.params.id);
    if (!circular) {
      return res.status(404).json({ message: 'Circular not found.' });
    }
    res.status(200).json({ message: 'Circular deleted successfully.' });
  } catch (error) {
    console.error('Error deleting circular:', error);
    res.status(500).json({ message: 'Failed to delete circular.' });
  }
});

module.exports = router;
