'use strict';

// building-model.js - A sequelize model
// 
// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.

const Sequelize = require('sequelize');

module.exports = function(sequelize) {
  const building = sequelize.define('buildings', {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    label: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  }, {
    freezeTableName: true
  });

  return building;
};
