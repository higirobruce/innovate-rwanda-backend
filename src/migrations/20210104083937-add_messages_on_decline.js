'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn(
      'Companies',
      'messages',
      {
        type: Sequelize.ARRAY(Sequelize.TEXT)
      }
    ),
    queryInterface.addColumn(
      'Events',
      'messages',
      {
        type: Sequelize.ARRAY(Sequelize.TEXT)
      }
    ),
    queryInterface.addColumn(
      'Blogs',
      'messages',
      {
        type: Sequelize.ARRAY(Sequelize.TEXT)
      }
    ),
    queryInterface.addColumn(
      'Jobs',
      'messages',
      {
        type: Sequelize.ARRAY(Sequelize.TEXT)
      }
    )
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      await queryInterface.removeColumn('Companies', 'messages'),
      await queryInterface.removeColumn('Events', 'messages'),
      await queryInterface.removeColumn('Blogs', 'messages'),
      await queryInterface.removeColumn('Jobs', 'messages')
    ]);
  }
};
