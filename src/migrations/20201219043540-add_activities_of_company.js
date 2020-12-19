'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('ActivitiesOfCompanies', {
      companyId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Companies",
          key: "id",
        },
      },
      activityId: {
        type: Sequelize.INTEGER,
        references: {
          model: "BusinessActivities",
          key: "id",
        },
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
    .then(() => {
      return queryInterface.addConstraint('ActivitiesOfCompanies', {
        fields: ['companyId', 'activityId'],
        type: 'primary key',
        name: 'ActivitiesOfCompanies_pkey'
      })})
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('ActivitiesOfCompanies');
  }
};