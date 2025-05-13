
const express = require('express');
const router = express.Router();
const circularController = require('../../Controllers/circular.controller');
const authMiddleware = require('../../Middlewares/auth.middleware');
const roleMiddleware = require('../../Middlewares/role.middleware');
const upload = require('../../Middlewares/upload.middleware');

router.post('/', authMiddleware, roleMiddleware(['Admin', 'Staff']), upload.single('attachment'), circularController.createCircular);
router.get('/', circularController.getAllCirculars);
router.get('/:id', circularController.getCircularById);

module.exports = router;
