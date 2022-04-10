

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('UserMessages', 'recipientId', {
    type: Sequelize.INTEGER,
    references: {
      model: 'Messages',
      key: 'id'
    }
  }),

  down: (queryInterface, Sequelize) => queryInterface.removeColumn('UserMessages', 'recipientId')
};
