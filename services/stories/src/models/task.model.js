// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const task = sequelizeClient.define('task', {
    type: {
      type: DataTypes.TEXT,
      allowNull: false,
      values: ['photo', 'graphic', 'draft'],
    },
    completed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    completed: {
      type: DataTypes.BOOLEAN,
    },
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      },
    },
  });

  task.associate = function (models) {
    models.belongsTo(models.story);
    models.belongsToMany(models.user, { as: 'Assignees', through: 'story_assignees' });
  };

  return assignment;
};
