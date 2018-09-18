'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.createTable('action', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,  
        allowNull: false,
        autoIncrement: true,
      },
      oldObject: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
      newObject: {
        type: Sequelize.JSONB,
        allowNull: false,
      },
      action: {
        type: Sequelize.ENUM,
        allowNull: false,
        values: ['approved', 'rejected', 'checkedOut','checkedIn', 'disabled'],
      },
      user: {
        type: Sequelize.JSONB,
        allowNull: false,
      },
      reservationId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'reservation',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('action');
  }
};
