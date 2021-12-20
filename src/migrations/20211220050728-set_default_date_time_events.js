'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn(
        'Events',
        'eventDate',
        {
          type: Sequelize.DATE,
          defaultValue: null
        }),
      queryInterface.changeColumn(
        'Events',
        'eventTime',
        {
          type: Sequelize.TIME,
          defaultValue: null
        }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('Events', 'eventDate'),
      queryInterface.changeColumn('Events', 'eventTime')
    ]);
  }
};
