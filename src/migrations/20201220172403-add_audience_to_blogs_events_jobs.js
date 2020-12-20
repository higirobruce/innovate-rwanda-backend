'use strict';
module.exports = {
  up: function (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn("Blogs", "tags"),
      queryInterface.removeColumn("Events", "tags"),
      queryInterface.removeColumn("Jobs", "tags"),
      queryInterface.createTable('AudienceForPosts', {
        typeOfPost: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.STRING,
        },
        postId: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        activityId: {
          allowNull: false,
          primaryKey: true,
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
      })
    ])
  },
  down: function (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn("Blogs", "tags", {
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn("Events", "tags", {
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn("Jobs", "tags", {
        type: Sequelize.STRING,
      }),
      queryInterface.dropTable('AudienceForPosts')
    ])
  }
};