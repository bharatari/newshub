const errors = require('@feathersjs/errors');

module.exports = function (options) {
  return async function (hook) {
    const models = hook.app.get('sequelize').models;

    if (hook.method === 'create') {
      try {
        const device = await models.device.findOne({
          where: {
            name: hook.data.name,
          },
        });

        if (device) {
          throw new errors.GeneralError('Name value must be unique');
        } else {
          return hook;
        }
      } catch (e) {
        throw e;
      }
    } else if (hook.method === 'patch') {
      try {
        const device = await models.device.findOne({
          where: {
            id: hook.id,
          },
        });

        if (!_.isNil(hook.data.name) && !_.isEmpty(hook.data.name)) {
          if (hook.data.name != device.name) {
            const existing = await models.device.findOne({
              where: {
                name: hook.data.name,
              },
            });

            if (existing) {
              throw new errors.GeneralError('Name value must be unique');
            } else {
              return hook;
            }
          }
        }
      } catch (e) {
        throw e;
      }
    }

    return hook;
  };
};

