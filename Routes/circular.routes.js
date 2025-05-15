const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload.middleware');
const verifyAdmin = require('../middlewares/admin.middleware');
const Circular = require('../models/circular.model');
//const authController = require('../../Controllers/auth.controller');
// Public: Get all circulars
router.get('/', async (req, res) => {
    try {
        const circulars = await Circular.find().sort({ date: -1 });
        res.json(circulars);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch circulars' });
    }
});

// Admin: Post new circular (supports file upload)
router.post('/', verifyAdmin, upload.single('file'), async (req, res) => {
    try {
        const circular = new Circular({
            title: req.body.title,
            description: req.body.description,
            fileUrl: req.file ? `/uploads/${req.file.filename}` : null
        });
        await circular.save();
        res.status(201).json(circular);
    } catch (error) {
        res.status(400).json({ error: 'Failed to create circular' });
    }
});

// Admin: Delete circular
router.delete('/:id', verifyAdmin, async (req, res) => {
    try {
        await Circular.findByIdAndDelete(req.params.id);
        res.json({ message: 'Circular deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: 'Failed to delete circular' });
    }
});

module.exports = router;
