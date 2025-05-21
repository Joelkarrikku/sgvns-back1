const Circular = require('../models/circular.model');

const uploadCircular = async (req, res) => {
  try {
    // Add these logs to debug incoming data
    console.log('Request Body:', req.body);
    console.log('Uploaded File Info:', req.file);

    const { title, description, audience } = req.body;

    if (!req.file || !req.file.path) {
      return res.status(400).json({ message: 'PDF file is required' });
    }

    // Cloudinary already hosted the file — use its URL directly
    const circular = await Circular.create({
      title,
      description,
      audience,
      attachmentUrl: req.file.path, // or req.file.secure_url depending on your cloudinary config
    });

    res.status(201).json({
      message: 'Circular uploaded successfully!',
      circular,
    });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({
      message: 'Server error uploading circular',
      error: err.message,
    });
  }
};

module.exports = { uploadCircular };
