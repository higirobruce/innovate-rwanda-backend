'use strict';

module.exports = {
  up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.changeColumn(
        'Jobs',
        'description',
        {
          type: Sequelize.TEXT,
        },
      ),
      queryInterface.addColumn(
        'Jobs', 
        'companyId',
        {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
      ),
      queryInterface.addColumn(
        'Jobs', 
        'category',
        {
          type: Sequelize.STRING,
          allowNull: false,
        },
      ),
      queryInterface.addColumn(
        'Jobs', 
        'tags',
        {
          type: Sequelize.STRING,
          allowNull: false,
        },
      ),
      queryInterface.addColumn(
        'Jobs', 
        'deadlineDate',
        {
          type: Sequelize.DATE,
          allowNull: false,
        },
      ),
      queryInterface.addColumn(
        'Jobs', 
        'deadlineTime',
        {
          type: Sequelize.TIME,
          allowNull: false,
        },
      ),
    ]);
  },

  down(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.changeColumn('Jobs', 'description'),
      queryInterface.removeColumn('Jobs', 'companyId'),
      queryInterface.removeColumn('Jobs', 'category'),
      queryInterface.removeColumn('Jobs', 'tags'),
      queryInterface.removeColumn('Jobs', 'deadlineDate'),
      queryInterface.removeColumn('Jobs', 'deadlineTime')
    ]);
  },
};
