'use strict';

module.exports = function (options) {
  return function (hook) {
    const models = hook.app.get('sequelize').models;

    if (hook.type === 'before') {
      const include = [{
        model: models.building,
      }];

      if (hook.params.sequelize) {
        hook.params.sequelize.include = include;
      } else {
        hook.params.sequelize = Object.assign(hook.params.sequelize, {
          include,
        });
      }
    }

    return hook;
  };
};
