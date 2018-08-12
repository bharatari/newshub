// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const action = sequelizeClient.define('action', {
    oldObject: {
      type: DataTypes.JSONB,
    },
    newObject: {
      type: DataTypes.JSONB,
      allowNull: null,
    },
    model: {
      type: DataTypes.TEXT,
      allowNull: null,
    },
    // CRUD action performed
    action: {
      type: DataTypes.TEXT,
      allowNull: null,
    },
    // Human-readable description
    // that fits the format
    // <user> <description> on <date>
    description: {
      type: DataTypes.TEXT,
    },
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  action.associate = function (models) {
    action.belongsTo(models.user);
  };

  return action;
};
