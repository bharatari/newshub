// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;
const modelUtils = require('../utils/models');

module.exports = function (app) {
  const sequelize = app.get('sequelize');

  const reservation = sequelize.define('reservation', {
    purpose: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    notes: {
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
    checkedOut: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    checkedIn: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    disabled: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    organizationId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    user: {
      type: Sequelize.JSONB,
      allowNull: false,
    },
    approvedBy: {
      type: Sequelize.JSONB,
    },
    checkedOutBy: {
      type: Sequelize.JSONB,
    },
    checkedInBy: {
      type: Sequelize.JSONB,
    },
    disabledBy: {
      type: Sequelize.JSONB,
    },
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  reservation.associate = function (models) {
    reservation.belongsToMany(models.device, { through: modelUtils.reservationDevices(sequelize) });
    reservation.hasMany(models.action);
  };

  return reservation;
};
