'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('log', 'date', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('log', 'date');
  }
};
