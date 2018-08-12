// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const building = sequelizeClient.define('building', {
    name: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    label: {
      type: Sequelize.TEXT,
      allowNull: false,
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

  building.associate = function (models) {

  };

  return building;
};
