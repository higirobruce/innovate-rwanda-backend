'use strict';

module.exports = {
  up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.changeColumn(
        'Messages',
        'companyId',
        {
          type: 'INTEGER USING CAST("companyId" as INTEGER)'
        },
      )
    ]);
  },

  down(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.changeColumn(
        'Messages',
        'companyId',
        {
          type: Sequelize.STRING
        },
      )
    ]);
  },
};
