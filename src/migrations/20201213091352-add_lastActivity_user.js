'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn(
      'Users',
      'lastActivity',
      {
        type: Sequelize.DATE,
      },
    )
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      await queryInterface.removeColumn('Users', 'lastActivity')
    ]);
  }
};
