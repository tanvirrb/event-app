const express = require('express');
const router = express.Router();
const eventsController = require('../events/events.controller');
const {
  createEventValidator,
  updateEventValidator,
  getEventsValidator,
} = require('../events/events.validator');
const withErrorHandler = require('../helpers/controllerErrorHandler');

router.post('/', createEventValidator, withErrorHandler(eventsController.createEvent));
router.get('/', getEventsValidator, withErrorHandler(eventsController.getEvents));
router.get('/:id', withErrorHandler(eventsController.getEventById));
router.put('/:id', updateEventValidator, withErrorHandler(eventsController.updateEventById));
router.delete('/:id', withErrorHandler(eventsController.deleteEventById));

module.exports = router;
