'use strict';

module.exports = {
  up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'Companies', 
        'logo',
        {
          type: Sequelize.BLOB,
          allowNull: true,
        },
      ),
      queryInterface.addColumn(
        'Companies',
        'yearFounded',
        {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
      ),
      queryInterface.changeColumn(
        'Companies',
        'shortDescription',
        {
          type: Sequelize.TEXT,
        },
      ),
      queryInterface.addColumn(
        'Companies',
        'contactEmail',
        {
          type: Sequelize.TEXT,
          allowNull: true,
        },
      ),
      queryInterface.addColumn(
        'Companies',
        'contactPhone',
        {
          type: Sequelize.TEXT,
          allowNull: true,
        },
      ),
      queryInterface.addColumn(
        'Companies',
        'mainAreaOfInterest',
        {
          type: Sequelize.TEXT,
          allowNull: true,
        },
      ),
      queryInterface.addColumn(
        'Companies',
        'customerBase',
        {
          type: Sequelize.TEXT,
          allowNull: true,
        },
      ),
      queryInterface.addColumn(
        'Companies',
        'socialMedia',
        {
          type: Sequelize.TEXT,
          allowNull: true,
        },
      ),
    ]);
  },

  down(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('Companies', 'logo'),
      queryInterface.removeColumn('Companies', 'yearFounded'),
      queryInterface.changeColumn('Companies', 'shortDescription'),
      queryInterface.removeColumn('Companies', 'contactEmail'),
      queryInterface.removeColumn('Companies', 'contactPhone'),
      queryInterface.removeColumn('Companies', 'mainAreaOfInterest'),
      queryInterface.removeColumn('Companies', 'customerBase'),
      queryInterface.removeColumn('Companies', 'socialMedia'),
    ]);
  },
};
