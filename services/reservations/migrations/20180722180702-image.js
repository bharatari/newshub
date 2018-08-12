'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('device', 'image', Sequelize.TEXT);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('device', 'image');
  }
};
