// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const cycle = sequelizeClient.define('cycle', {
    title: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    dropDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    type: {
      type: DataTypes.TEXT,
      allowNull: false,
      values: ['print', 'web'],
    },
    notes: {
      type: DataTypes.TEXT,
    },
    options: {
      type: DataTypes.JSONB,
      allowNull: false,
      defaultValue: {},
    },
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  cycle.associate = function (models) {
    models.hasMany(models.story);
    models.hasMany(models.draft);
  };

  return cycle;
};
