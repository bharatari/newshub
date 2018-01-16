const moment = require('moment');

module.exports = function () {
  return async function (hook) {
    const models = hook.app.get('sequelize').models;

    const eventId = hook.data.eventId;
    const userId = hook.data.targetUserId;
    const organizationId = hook.data.organizationId;

    try {
      const log = await models.log.findOne({
        where: {
          eventId,
          targetUserId: userId,
          organizationId,
          type: 'clock-in',
        },
        order: [['createdAt', 'DESC']],
      });
  
      if (log) {
        const now = moment();
        const yesterday = moment().subtract(24, 'hours');
        const oneMinuteAgo = moment().subtract(1, 'minute');

        if (moment(log.createdAt).isBetween(yesterday, now)) {
          if (moment(log.createdAt).isBetween(oneMinuteAgo, now)) {
            // A clock-in was already recorded within 1 minute
            // Just return previous clock-in
            hook.result = log;
          } else {
            // Clock-in within 24 hours
            // but not within a minute
            hook.data.type = 'clock-out';
          }
        } else {
          // Clock-in not within 24 hours
          hook.data.type = 'clock-in';
        }        
      } else {
        // No previous records
        hook.data.type = 'clock-in';
      }
    } catch (e) {
      throw e;
    }

    return hook;    
  };
};
