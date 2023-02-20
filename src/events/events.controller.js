const eventsService = require('./events.service');
const {
  HTTP_NOT_FOUND,
  HTTP_CREATED,
  HTTP_OK,
} = require('../config/constants');

module.exports.createEvent = async (req, res, next) => {
  try {
    const event = await eventsService.createEvent(req.body);
    return res.status(HTTP_CREATED.code).json({ data: event });
  } catch (err) {
    console.error('Controller createEvent err', err);
    return next(new Error(err));
  }
};

module.exports.getEvents = async (req, res, next) => {
  try {
    const { pageNumber, pageSize } = req.query;
    const [events, totalEvents] = await Promise.allSettled([
      eventsService.getEvents(pageNumber, pageSize),
      eventsService.getEventCount(),
    ]);

    return res
      .status(HTTP_OK.code)
      .json({ pageNumber, pageSize, totalEvents: totalEvents.value, data: events.value });
  } catch (err) {
    console.error('Controller getEvents err', err);
    return next(new Error(err));
  }
};

module.exports.getEventById = async (req, res, next) => {
  try {
    const event = await eventsService.getEventById(req.params.id);
    if (!event) return res.status(HTTP_NOT_FOUND).json({ error: HTTP_NOT_FOUND.message });

    return res.status(HTTP_OK.code).json({ data: event });
  } catch (err) {
    console.error('Controller getEventById err', err);
    return next(new Error(err));
  }
};

module.exports.updateEventById = async (req, res, next) => {
  try {
    const event = await eventsService.updateEventById(req.params.id, req.body);
    if (!event) return res.status(HTTP_NOT_FOUND.code).json({ error: HTTP_NOT_FOUND.message });
    const updatedEvent = await eventsService.getEventById(req.params.id);

    return res.status(HTTP_OK.code).json({ data: updatedEvent });
  } catch (err) {
    console.error('Controller updateEventById err', err);
    return next(new Error(err));
  }
};

module.exports.deleteEventById = async (req, res, next) => {
  try {
    const event = await eventsService.deleteEventById(req.params.id);
    if (!event) return res.status(HTTP_NOT_FOUND.code).json({ error: HTTP_NOT_FOUND.message });

    return res.status(HTTP_OK.code).json({ data: !!event });
  } catch (err) {
    console.error('Controller deleteEventById err', err);
    return next(new Error(err));
  }
};
