// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');

module.exports = function (app) {
  const sequelize = app.get('sequelize');
  const event = sequelize.define('event', {
    name: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    startDate: {
      type: Sequelize.DATE,
    },
    endDate: {
      type: Sequelize.DATE,
    },
    closed: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    organizationId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    notes: {
      type: Sequelize.TEXT,
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    }
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  event.associate = function (models) {
    event.hasMany(models.log);
  };

  return event;
};
