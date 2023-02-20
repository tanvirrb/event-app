const eventsService = require('./events.service');
const { HTTP_NOT_FOUND, HTTP_CREATED, HTTP_OK } = require('../config/constants');

module.exports.createEvent = async (req, res) => {
  const event = await eventsService.createEvent(req.body);
  return res.status(HTTP_CREATED.code).json({ data: event });
};

module.exports.getEvents = async (req, res) => {
  const { pageNumber, pageSize } = req.query;
  const [events, totalEvents] = await Promise.allSettled([
    eventsService.getEvents(pageNumber, pageSize),
    eventsService.getEventCount(),
  ]);

  return res
    .status(HTTP_OK.code)
    .json({ pageNumber, pageSize, totalEvents: totalEvents.value, data: events.value });
};

module.exports.getEventById = async (req, res) => {
  const event = await eventsService.getEventById(req.params.id);
  if (!event) return res.status(HTTP_NOT_FOUND.code).json({ error: HTTP_NOT_FOUND.message });

  return res.status(HTTP_OK.code).json({ data: event });
};

module.exports.updateEventById = async (req, res) => {
  const event = await eventsService.updateEventById(req.params.id, req.body);
  if (!event[0]) return res.status(HTTP_NOT_FOUND.code).json({ error: HTTP_NOT_FOUND.message });
  const updatedEvent = await eventsService.getEventById(req.params.id);

  return res.status(HTTP_OK.code).json({ data: updatedEvent });
};

module.exports.deleteEventById = async (req, res) => {
  const event = await eventsService.deleteEventById(req.params.id);
  if (!event) return res.status(HTTP_NOT_FOUND.code).json({ error: HTTP_NOT_FOUND.message });

  return res.status(HTTP_OK.code).json({ data: !!event });
};
