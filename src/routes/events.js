const express = require('express');
const router = express.Router();
const eventsController = require('../events/events.controller');
const { createEventValidator } = require('../events/events.validator');

router.post('/', createEventValidator, eventsController.createEvent);
// router.get('/', eventsController.getEvents);

module.exports = router;
