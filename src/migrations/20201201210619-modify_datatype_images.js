'use strict';

module.exports = {
  up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.changeColumn(
        'Jobs',
        'jobDetailsDocument',
        {
          type: Sequelize.STRING
        },
      ),
      queryInterface.changeColumn(
        'Companies',
        'logo',
        {
          type: Sequelize.STRING
        },
      ),
      queryInterface.changeColumn(
        'Blogs',
        'image',
        {
          type: Sequelize.STRING
        },
      ),
      queryInterface.changeColumn(
        'Events',
        'flyer',
        {
          type: Sequelize.STRING
        },
      ),
    ]);
  },

  down(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.changeColumn('Jobs', 'jobDetailsDocument'),
      queryInterface.changeColumn('Companies', 'logo'),
      queryInterface.changeColumn('Blogs', 'image'),
      queryInterface.changeColumn('Events', 'flyer')
    ]);
  },
};
