'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Individuals', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      lastName: {
        type: Sequelize.STRING,
      },
      firstName: {
        type: Sequelize.STRING,
      },
      accType: {
        type: Sequelize.STRING,
      },
      shortDescription: {
        type: Sequelize.TEXT,
      },
      picture: {
        type: Sequelize.STRING,
      },
      location: {
        type: Sequelize.STRING,
      },
      portfolio: {
        type: Sequelize.STRING,
      },
      linkedin: {
        type: Sequelize.STRING,
      },
      slug: {
        type: Sequelize.STRING,
      },
      contactEmail: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING,
      },
      contactPhone: {
        type: Sequelize.STRING,
      },
      emailDisplay: {
        type: Sequelize.BOOLEAN,
      },
      phoneDisplay: {
        type: Sequelize.BOOLEAN,
      },
      status: {
        type: Sequelize.STRING,
      },
      user_id: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Individuals');
  }
};
