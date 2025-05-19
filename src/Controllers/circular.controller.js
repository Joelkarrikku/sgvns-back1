const Circular = require('../models/circular.model');

const createCircular = async (req, res) => {
  try {
    const { title, description, audience = 'All' } = req.body;
    
    const filePath = req.file ? `/uploads/${req.file.filename}` : null;

    const circular = new Circular({
      title,
      description,
      attachmentUrl: filePath, // ✅ saving file path here
      audience,
    });

    await circular.save();

    res.status(201).json({
      message: 'Circular uploaded successfully',
      circular,
    });
  } catch (error) {
    console.error('Error uploading circular:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


module.exports = { createCircular };
