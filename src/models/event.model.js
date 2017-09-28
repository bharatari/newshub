// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const event = sequelizeClient.define('event', {
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
      type: Sequelize.TEXT,
      allowNull: false,
    },
    notes: {
      type: Sequelize.TEXT,
    },
    userId: {
      type: Sequelize.TEXT,
      allowNull: false,
    }
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  event.associate = function (models) { // eslint-disable-line no-unused-vars
    event.hasMany(models.log);
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return event;
};
