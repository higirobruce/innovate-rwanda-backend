'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn(
      'CompanyCategories',
      'image',
      {
        type: Sequelize.STRING
      }
    )
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      await queryInterface.removeColumn('CompanyCategories', 'image')
    ]);
  }
};
