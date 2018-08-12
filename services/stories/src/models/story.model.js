// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const story = sequelizeClient.define('story', {
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    notes: {
      type: DataTypes.TEXT,
    },
    approved: {
      type: DataTypes.BOOLEAN,
    },
    completed: {
      type: DataTypes.BOOLEAN,
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  story.associate = function (models) {
    models.hasOne(models.status);
    models.belongsTo(models.cycle);
    models.belongsTo(models.section);
    models.hasMany(models.task);    
    models.belongsToMany(models.user, { as: 'Assignees', through: 'story_assignees' });
    models.belongsToMany(models.user, { as: 'Reviewers', through: 'story_reviewers' });
  };

  return story;
};
