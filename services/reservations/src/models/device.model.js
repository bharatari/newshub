// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;
const modelUtils = require('../utils/models');

module.exports = function (app) {
  const sequelize = app.get('sequelize');

  const device = sequelize.define('device', {
    name: {
      type: Sequelize.TEXT,
    },
    label: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    description: {
      type: Sequelize.TEXT,
    },
    notes: {
      type: Sequelize.TEXT,
    },
    type: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    meta: {
      type: Sequelize.JSON,
    },
    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    specialApproval: {
      type: Sequelize.TEXT,
      defaultValue: null,
    },
    barcode: {
      type: Sequelize.TEXT,
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
    image: {
      type: Sequelize.TEXT,
    },
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  device.associate = function (models) {
    device.belongsToMany(models.reservation, {
      through: modelUtils.reservationDevices(sequelize),
    });
  };

  return device;
};
