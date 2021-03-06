// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const room = sequelizeClient.define('room', {
    name: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    label: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    description: {
      type: Sequelize.TEXT,
    },
    capacity: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    meta: {
      type: Sequelize.JSONB,
      allowNull: false,
      defaultValue: {},
    },
    disabled: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    specialApproval: {
      type: Sequelize.TEXT,
      defaultValue: null,
    },
    managerId: {
      type: Sequelize.INTEGER,
      allowNull: false,
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

  room.associate = function (models) {
    room.belongsTo(models.building);
  };

  return room;
};
