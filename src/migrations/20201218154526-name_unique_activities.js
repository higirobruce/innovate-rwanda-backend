'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn(
        'BusinessActivities',
        'name',
        {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true
        },
      )
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      await queryInterface.changeColumn('BusinessActivities', 'name')
    ]);
  }
};
