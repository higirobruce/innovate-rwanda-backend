'use strict';

module.exports = {
  up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'Companies',
        'emailDisplay',
        {
          type: Sequelize.BOOLEAN,
        },
      ),
      queryInterface.addColumn(
        'Companies', 
        'phoneDisplay',
        {
          type: Sequelize.BOOLEAN,
        },
      ),
      queryInterface.addColumn(
        'Companies', 
        'officeAddress',
        {
          type: Sequelize.STRING,
        },
      ),
    ]);
  },

  down(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('Companies', 'emailDisplay'),
      queryInterface.removeColumn('Companies', 'phoneDisplay'),
      queryInterface.removeColumn('Companies', 'officeAddress')
    ]);
  },
};
