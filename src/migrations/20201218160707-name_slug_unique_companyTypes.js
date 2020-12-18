'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn(
        'CompanyTypes',
        'name',
        {
          allowNull: false,
          unique: true,
          type: Sequelize.STRING
        }),
      queryInterface.changeColumn(
        'CompanyTypes',
        'slug',
        {
          allowNull: false,
          unique: true,
          type: Sequelize.STRING
        },
      )
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      await queryInterface.changeColumn('CompanyTypes', 'name'),
      await queryInterface.changeColumn('CompanyTypes', 'slug')
    ]);
  }
};
