const errors = require('@feathersjs/errors');
const moment = require('moment');

module.exports = function (options) {
  return async function (hook) {
    const models = hook.app.get('sequelize').models;
  
    const eventId = hook.data.eventId;
    
    try {
      const event = await models.event.count({
        where: {
          id: eventId,
        },
      });
  
      if (!event) {
        throw new errors.GeneralError('Event does not exist');
      } else {
        if (event.closed) {
          throw new errors.GeneralError('Event is closed');
        } else if (moment().isAfter(event.endDate)) {
          throw new errors.GeneralError('Event is closed');
        } else if (moment().isBefore(event.startDate)) {
          throw new errors.GeneralError('Event has not started yet');
        }

        return hook;
      }
    } catch (e) {
      throw e;
    }
  };
};

