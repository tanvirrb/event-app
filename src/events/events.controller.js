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
