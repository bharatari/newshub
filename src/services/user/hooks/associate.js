'use strict';

const errors = require('@feathersjs/errors');

module.exports = function (options) {
  return function (hook) {
    return hook.app.get('sequelize').models.user.findOne({
      where: {
        id: hook.result.id,
      },
    }).then(async (user) => {
      await user.addOrganization(hook.result.currentOrganizationId);
    }).catch((err) => {
      throw err;
    });
  };
};
