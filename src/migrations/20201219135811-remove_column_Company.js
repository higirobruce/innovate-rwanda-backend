"use strict";
module.exports = {
  up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn("Companies", "businessActivities")
    ]);
  },

  down(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'Companies',
        'businessActivityId',
        {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: {
            model: "BusinessActivities",
            key: "id",
          },
        },
      ),
      queryInterface.addColumn("Companies", "businessActivities", {
        type: Sequelize.STRING,
      })
    ]);
  },
};