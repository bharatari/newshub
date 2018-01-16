// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');

module.exports = function (app) {
  const sequelize = app.get('sequelize');

  const log = sequelize.define('log', {
    type: {
      type: Sequelize.TEXT,
      allowNull: false,
      values: ['clock-in', 'clock-out'],
    },
    targetUserId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    targetUser: {
      type: Sequelize.JSONB,
      allowNull: false,
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    meta: {
      type: Sequelize.JSON,
      allowNull: false,
      defaultValue: {},
    },
    organizationId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  log.associate = function (models) {
    log.belongsTo(models.event);
  };

  return log;
};
