const Circular = require('../models/circular.model');

// Create circular (Admin only)
exports.createCircular = async (req, res) => {
  try {
    const { title, description } = req.body;
    const file = req.file ? req.file.filename : null;

    const circular = new Circular({ title, description, file });
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

// Get all circulars (Public)
exports.getCirculars = async (req, res) => {
  try {
    const circulars = await Circular.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      message: 'Circulars fetched successfully',
      data: circulars,
    });
  } catch (error) {
    console.error('Get Circulars Error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};
