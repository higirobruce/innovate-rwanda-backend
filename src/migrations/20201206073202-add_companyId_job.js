'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn(
      'Events',
      'companyId',
      {
        type: Sequelize.STRING,
      },
    ),
      queryInterface.changeColumn(
        'Jobs',
        'companyId',
        {
          type: Sequelize.STRING,
        },
      )
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      await queryInterface.changeColumn('Jobs', 'companyId'),
      await queryInterface.removeColumn('Events', 'companyId')
    ]);
  }
};
