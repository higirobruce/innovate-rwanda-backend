'use strict';

module.exports = {
  up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.changeColumn('Notifications','content',{ type: Sequelize.TEXT})
    ]);
  },

  down(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.changeColumn('Notifications','content',{ type: Sequelize.STRING })
    ]);
  },
};
