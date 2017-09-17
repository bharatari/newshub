'use strict';

// activity-model.js - A sequelize model
// 
// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.

const Sequelize = require('sequelize');

module.exports = function(sequelize) {
  const activity = sequelize.define('activity', {
    payload: {
      type: Sequelize.JSONB,
      allowNull: false,
    },
    meta: {
      type: Sequelize.JSONB,
      allowNull: false,
    },
    service: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    method: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    objectId: {
      type: Sequelize.INTEGER,
    },
    tag: {
      type: Sequelize.TEXT,
    },
  }, {
    freezeTableName: true,
    classMethods: {
      associate(models) {
        activity.belongsTo(models.user);
        activity.belongsTo(models.organization);
      },
    },
  });

  return activity;
};
