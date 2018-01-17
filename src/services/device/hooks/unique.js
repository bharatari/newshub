const errors = require('@feathersjs/errors');

module.exports = function (options) {
  return async function (hook) {
    const models = hook.app.get('sequelize').models;

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
  };
};

