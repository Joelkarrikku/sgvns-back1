
const express = require('express');
const router = express.Router();
const notificationController = require('../../Controllers/notification.controller');
const authMiddleware = require('../../Middlewares/auth.middleware');
const roleMiddleware = require('../../Middlewares/role.middleware');

router.post('/', authMiddleware, roleMiddleware(['Admin', 'Staff']), notificationController.createNotification);
router.get('/', notificationController.getAllNotifications);
router.patch('/:id/read', notificationController.markAsRead);

module.exports = router;
