const express = require('express');
const router = express.Router();
const upload = require('../config/cloudinary');
const { verifyToken, isAdmin } = require('../middlewares/auth.middleware');
const { addCircular } = require('../Controllers/circular.controller');

router.post('/', verifyToken, isAdmin, upload.single('file'), addCircular);

module.exports = router;
