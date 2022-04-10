

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('UserMessages', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    userId: {
      type: Sequelize.INTEGER
    },
    recipientId: {
      type: Sequelize.INTEGER
    },
    lastMessageId: {
      type: Sequelize.INTEGER
    },
    unreadMessagesCount: {
      type: Sequelize.INTEGER
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),
  // eslint-disable-next-line no-unused-vars
  down: (queryInterface, Sequelize) => queryInterface.dropTable('UserMessages')
};
