'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn(
      'Messages',
      'firstread',
      {
        type: Sequelize.DATE,
      },
    ),
    queryInterface.addColumn(
      'Notifications',
      'firstread',
      {
        type: Sequelize.DATE,
      },
    )
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      await queryInterface.removeColumn('Messages', 'firstread'),
      await queryInterface.removeColumn('Notifications', 'firstread')
    ]);
  }
};
