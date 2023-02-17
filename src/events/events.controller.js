const eventsService = require('./events.service');

module.exports.createEvent = async (req, res) => {
  try {
    const event = await eventsService.createEvent(req.body);
    res.status(201).json({ data: event });
  } catch (err) {
    console.error('Controller createEvent err', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports.getEvents = async (req, res) => {
  try {
    const { pageNumber, pageSize } = req.query;
    const [events, totalEvents] = await Promise.allSettled([
      eventsService.getEvents(pageNumber, pageSize),
      eventsService.getEventCount(),
    ]);
    res
      .status(200)
      .json({ pageNumber, pageSize, totalEvents: totalEvents.value, data: events.value });
  } catch (err) {
    console.error('Controller getEvents err', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports.getEventById = async (req, res) => {
  try {
    const event = await eventsService.getEventById(req.params.id);
    if (!event) return res.status(404).json({ error: 'Event not found' });
    res.status(200).json({ data: event });
  } catch (err) {
    console.error('Controller getEventById err', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports.updateEventById = async (req, res) => {
  try {
    const event = await eventsService.updateEventById(req.params.id, req.body);
    if (!event) return res.status(404).json({ error: 'Event not found' });
    res.status(200).json({ data: event });
  } catch (err) {
    console.error('Controller updateEventById err', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports.deleteEventById = async (req, res) => {
  try {
    const event = await eventsService.deleteEventById(req.params.id);
    if (!event) return res.status(404).json({ error: 'Event not found' });
    res.status(200).json({ data: !!event });
  } catch (err) {
    console.error('Controller deleteEventById err', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
