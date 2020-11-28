'use strict';

module.exports = {
  up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.changeColumn(
        'Events',
        'description',
        {
          type: Sequelize.TEXT,
          allowNull: false,
        },
      ),
      queryInterface.addColumn(
        'Events', 
        'category',
        {
          type: Sequelize.STRING,
          allowNull: false,
        },
      ),
      queryInterface.addColumn(
        'Events', 
        'tags',
        {
          type: Sequelize.STRING,
          allowNull: false,
        },
      ),
      queryInterface.addColumn(
        'Events', 
        'flyer',
        {
          type: Sequelize.BLOB,
          allowNull: true,
        },
      ),
      queryInterface.addColumn(
        'Events', 
        'eventDate',
        {
          type: Sequelize.DATE,
          allowNull: false,
        },
      ),
      queryInterface.addColumn(
        'Events', 
        'eventTime',
        {
          type: Sequelize.TIME,
          allowNull: false,
        },
      ),
      queryInterface.addColumn(
        'Events', 
        'author',
        {
          type: Sequelize.TIME,
          allowNull: false,
        },
      )
    ]);
  },

  down(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.changeColumn('Events', 'description'),
      queryInterface.removeColumn('Events', 'category'),
      queryInterface.removeColumn('Events', 'tags'),
      queryInterface.removeColumn('Events', 'flyer'),
      queryInterface.removeColumn('Events', 'eventDate'),
      queryInterface.removeColumn('Events', 'eventTime'),
      queryInterface.removeColumn('Events', 'author')
    ]);
  },
};
