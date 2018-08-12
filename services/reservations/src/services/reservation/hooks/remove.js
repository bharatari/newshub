const errors = require('@feathersjs/errors');
const data = require('../../../utils/data');
const access = require('../../../utils/access');

module.exports = function (options) {
  return function (hook) {
    const models = hook.app.get('sequelize').models;
    const redis = hook.app.get('redis');

    return models.reservation.findOne({
      where: {
        id: hook.id,
      },
    }).then(async (reservation) => {
      // STORE THIS CALL
      const canDelete = await access.can(hook.params.authorization, 'reservation', 'delete', null, hook.id);

      if (canDelete) {
        // STORE THIS CALL
        const users = await data.getDeviceManagers(hook.params.authorization);

        try {
          await email.queueEmails(users, null, hook.params.user.fullName, 'DELETED_RESERVATION');

          return hook;
        } catch (e) {
          // Don't throw error just because email didn't send
          return hook;
        }
      } else {
        throw new errors.Forbidden('Must have the permission to delete this');
      }
    }).catch((err) => {
      throw err;
    });
  };
};

