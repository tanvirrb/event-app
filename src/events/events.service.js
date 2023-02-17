const { Event } = require('../models');
const _p = require('../helpers/asyncWrapper');

module.exports = {
  createEvent: async (eventData) => {
    const [err, newEvent] = await _p(Event.create(eventData));
    if (err) console.error('Service createEvent err', err);
    return newEvent;
  },

  getEventById: async (id) => {
    const [err, event] = await _p(Event.findOne({ where: { id } }));
    if (err) console.error('Service getEventById err', err);
    return event;
  },

  deleteEvents: async () => {
    return Event.destroy({
      where: {},
      truncate: true,
    });
  },
};
