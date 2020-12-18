'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn(
        'Subscriptions',
        'email',
        {
          allowNull: false,
          unique: true,
          type: Sequelize.STRING
        })
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      await queryInterface.changeColumn('Subscriptions', 'email')
    ]);
  }
};
