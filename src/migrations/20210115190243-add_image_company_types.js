'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn(
      'CompanyTypes',
      'image',
      {
        type: Sequelize.STRING,
      },
    ),
    queryInterface.addColumn(
      'CompanyTypes',
      'description',
      {
        type: Sequelize.TEXT,
      },
    )
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      await queryInterface.removeColumn('CompanyTypes', 'image'),
      await queryInterface.removeColumn('CompanyTypes', 'description')
    ]);
  }
};
