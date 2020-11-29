'use strict';

module.exports = {
  up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'Jobs',
        'jobDetailsDocument',
        {
          type: Sequelize.BLOB('long')
        },
      )
    ]);
  },

  down(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('Jobs', 'jobDetailsDocument')
    ]);
  },
};
