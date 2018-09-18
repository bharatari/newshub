// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelize = app.get('sequelize');

  const action = sequelize.define('action', {
    oldObject: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    newObject: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    action: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: ['approved', 'rejected', 'checkedOut','checkedIn', 'disabled'],
    },
    user: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  action.associate = function (models) {
    action.belongsTo(models.reservation);
  };

  return action;
};
