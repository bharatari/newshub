'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('device', 'imageId');
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('device', 'imageId', Sequelize.INTEGER);
  }
};
