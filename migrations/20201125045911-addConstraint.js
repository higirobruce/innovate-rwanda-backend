'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn(
        'Companies',
        'coName',
        {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true
        },
      ),
      queryInterface.changeColumn(
        'Users',
        'email',
        {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true
        }
      )
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      await queryInterface.changeColumn('companies', 'coName'),
      await queryInterface.changeColumn('users', 'email')
    ]);
  }
};
