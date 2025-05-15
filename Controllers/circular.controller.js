const Circular = require('../models/circular.model');


exports.createCircular = async (req, res) => {
  try {
    const { title, description, audience } = req.body;
    const attachmentUrl = req.file ? `/uploads/${req.file.filename}` : '';
    const circular = new Circular({ title, description, audience, attachmentUrl });
    await circular.save();
    res.status(201).json(circular);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.getAllCirculars = async (req, res) => {
  try {
    const circulars = await Circular.find().sort({ publishedAt: -1 });
    res.json(circulars);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.getCircularById = async (req, res) => {
  try {
    const circular = await Circular.findById(req.params.id);
    if (!circular) return res.status(404).json({ message: 'Circular not found' });
    res.json(circular);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
