const { Event } = require('../models');

module.exports = {
  createEvent: async (eventData) => {
    return Event.create(eventData);
  },

  getEventById: async (id) => {
    return Event.findByPk(id, { raw: true });
  },

  deleteEvents: async () => {
    return Event.destroy({
      where: {},
      truncate: true,
    });
  },

  updateEventById: async (id, eventData) => {
    return Event.update(eventData, { where: { id } });
  },

  deleteEventById: async (id) => {
    return Event.destroy({ where: { id } });
  },
};
