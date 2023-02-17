const express = require('express');
const router = express.Router();
const eventsController = require('../events/events.controller');
const { createEventValidator, updateEventValidator } = require('../events/events.validator');

router.post('/', createEventValidator, eventsController.createEvent);
router.get('/', eventsController.getEvents);
router.get('/:id', eventsController.getEventById);
router.put('/:id', updateEventValidator, eventsController.updateEventById);
router.delete('/:id', eventsController.deleteEventById);

module.exports = router;
