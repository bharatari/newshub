module.exports = function (options) {
  return async function (hook) {
    const eventId = hook.data.eventId;

    const models = hook.app.get('sequelize').models;
  
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

