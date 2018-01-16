const errors = require('@feathersjs/errors');

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
        return hook;
      }
    } catch (e) {
      throw e;
    }
  };
};

