
const express = require('express');
const router = express.Router();
const eventController = require('../../Controllers/event.controller');
const authMiddleware = require('../../Middlewares/auth.middleware');
const roleMiddleware = require('../../Middlewares/role.middleware');
const upload = require('../../Middlewares/upload.middleware');

router.post('/', authMiddleware, roleMiddleware(['Admin', 'Staff']), upload.single('image'), eventController.createEvent);
router.get('/', eventController.getAllEvents);
router.get('/upcoming', eventController.getUpcomingEvents);

module.exports = router;
