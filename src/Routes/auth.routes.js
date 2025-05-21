const express = require('express');
const router = express.Router();
const authController = require('../Controllers/auth.controller'); // ✅ Corrected path
const { verifyToken } = require('../middlewares/auth.middleware');
router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/profile', verifyToken, authController.getAdminProfile);

module.exports = router;
