

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('Activities', 'category', {
    type: Sequelize.STRING,
  }),

  down: queryInterface => queryInterface.removeColumn('Activities', 'category')
};
