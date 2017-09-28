// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const log = sequelizeClient.define('log', {
    type: {
      type: Sequelize.TEXT,
      allowNull: false,
      values: ['clock-in', 'clock-out'],
    },
    targetUserId: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    userId: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    meta: {
      type: Sequelize.JSON,
      allowNull: false,
      defaultValue: {},
    },
    organizationId: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  log.associate = function (models) { // eslint-disable-line no-unused-vars
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return log;
};
