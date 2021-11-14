'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
        'CompanyTypes',
        'display_order',
        {
          type: Sequelize.INTEGER,
          allowNull: true,
        });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('CompanyTypes', 'display_order');
  }
};
