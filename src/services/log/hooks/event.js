const errors = require('@feathersjs/errors');
const moment = require('moment');

module.exports = function (options) {
  return async function (hook) {
    const models = hook.app.get('sequelize').models;
  
    const eventId = hook.data.eventId;

    // Creating a log manually, let it go through
    if (hook.data.date && hook.data.type) {
      return hook;
    }

    try {
      const event = await models.event.findOne({
        where: {
          id: eventId,
        },
      });

      if (!event) {
        throw new errors.BadRequest('Event does not exist');
      } else {
        if (event.closed) {
          throw new errors.BadRequest('EVENT_CLOSED');
        } else if (moment().isAfter(event.endDate)) {
          throw new errors.BadRequest('EVENT_CLOSED');
        } else if (moment().isBefore(event.startDate)) {
          throw new errors.BadRequest('EVENT_NOT_STARTED');
        }

        return hook;
      }
    } catch (e) {
      throw e;
    }
  };
};

