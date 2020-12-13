'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn(
        'Blogs',
        'companyId',
        {
          type: 'INTEGER USING CAST ("companyId" as INTEGER)'
        }
      ),
      queryInterface.changeColumn(
        'Blogs',
        'author',
        {
          type: 'INTEGER USING CAST ("companyId" as INTEGER)'
        }
      ),
      queryInterface.changeColumn(
        'Events',
        'companyId',
        {
          type: 'INTEGER USING CAST ("companyId" as INTEGER)'
        }
      ),
      queryInterface.changeColumn(
        'Events',
        'author',
        {
          type: 'INTEGER USING CAST ("companyId" as INTEGER)'
        }
      ),
      queryInterface.changeColumn(
        'Jobs',
        'companyId',
        {
          type: 'INTEGER USING CAST ("companyId" as INTEGER)'
        }
      )
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('Blogs', 'companyId'),
      queryInterface.changeColumn('Blogs', 'author'),
      queryInterface.changeColumn('Events', 'companyId'),
      queryInterface.changeColumn('Events', 'author'),
      queryInterface.changeColumn('Jobs', 'companyId')
    ]);
  },
};
