const Circular = require('../models/Circular');

const uploadCircular = async (req, res) => {
  try {
    const { title, description, audience } = req.body;

    if (!req.file || !req.file.path) {
      return res.status(400).json({ message: 'PDF file is required' });
    }

    // Cloudinary already hosted the file — use its URL directly
    const circular = await Circular.create({
      title,
      description,
      audience,
      attachmentUrl: req.file.path, // This is the Cloudinary secure_url
    });

    res.status(201).json({
      message: 'Circular uploaded successfully!',
      circular,
    });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ message: 'Server error uploading circular' });
  }
};

module.exports = { uploadCircular };
