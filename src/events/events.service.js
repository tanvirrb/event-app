const { Event } = require('../models');

const paginateList = (query, { page: pageNumber, pageSize }) => {
  const offset = parseInt(--pageNumber * pageSize);
  const limit = parseInt(pageSize);
  return {
    ...query,
    offset,
    limit,
  };
};
module.exports = {
  createEvent: async (eventData) => {
    return Event.create(eventData);
  },

  getEvents: async (pageNumber, pageSize) => {
    return Event.findAll(
      paginateList(
        {
          order: [['id', 'DESC']],
          raw: true,
        },
        { page: pageNumber, pageSize }
      )
    );
  },

  getEventCount: async () => {
    return Event.count();
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
