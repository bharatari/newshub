// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const reservation = sequelizeClient.define('reservation', {
    purpose: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    notes: {
      type: Sequelize.TEXT,
    },
    specialRequests: {
      type: Sequelize.TEXT,
    },
    adminNotes: {
      type: Sequelize.TEXT,
    },
    startDate: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    endDate: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    meta: {
      type: Sequelize.JSON,
    },
    approved: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    disabled: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    userId: {

    },
    organizationId: {

    }
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  reservation.associate = function (models) {
    reservation.belongsTo(models.room);
  };

  return reservation;
};
