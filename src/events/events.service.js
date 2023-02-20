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
  /**
   * @description create a new event
   * @param eventData
   * @returns {Promise<Event>}
   */
  createEvent: async (eventData) => {
    return Event.create(eventData);
  },

  /**
   * @description get all events
   * @param pageNumber
   * @param pageSize
   * @returns {Promise<Event[]>}
   */
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

  /**
   * @description get total number of events
   * @returns {Promise<number>}
   */
  getEventCount: async () => {
    return Event.count();
  },

  /**
   * @description get event by id
   * @param id
   * @returns {Promise<Event>}
   */
  getEventById: async (id) => {
    return Event.findByPk(id, { raw: true });
  },

  /**
   * @description delete all events
   * @returns {Promise<*>}
   */
  deleteEvents: async () => {
    return Event.destroy({
      where: {},
      truncate: true,
    });
  },

  /**
   * @description update event by id
   * @param id
   * @param eventData
   * @returns {Promise<Event>}
   */
  updateEventById: async (id, eventData) => {
    return Event.update(eventData, { where: { id } });
  },

  /**
   * @description delete event by id
   * @param id
   * @returns {Promise<Boolean>}
   */
  deleteEventById: async (id) => {
    return Event.destroy({ where: { id } });
  },
};
