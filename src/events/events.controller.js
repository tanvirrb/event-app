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
