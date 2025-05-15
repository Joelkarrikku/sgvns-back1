const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller'); // ✅ Corrected path

router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;
