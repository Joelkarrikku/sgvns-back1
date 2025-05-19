const Circular = require('../models/circular.model');

// Create circular (Admin only)
exports.createCircular = async (req, res) => {
  try {
    const { title, description, audience } = req.body;
    const attachmentUrl = req.file ? `uploads/${req.file.filename}` : null;

    const circular = new Circular({ title, description, audience, attachmentUrl });
    await circular.save();

    res.status(201).json({
      success: true,
      message: 'Circular created successfully',
      data: circular,
    });
  } catch (error) {
    console.error('Create Circular Error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};
