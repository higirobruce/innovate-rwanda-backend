"use strict";
module.exports = {
  up(queryInterface, Sequelize) {
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
      }),
      queryInterface.removeColumn("Companies", "areaOfInterest"),
      queryInterface.removeColumn("Companies", "mainAreaOfInterest"),
    ]);
  },

  down(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn("Companies", "businessActivityId", {}),
      queryInterface.removeColumn("Companies", "businessActivities", {}),
      queryInterface.addColumn("Companies", "areaOfInterest", {}),
      queryInterface.addColumn("Companies", "mainAreaOfInterest", {}),
    ]);
  },
};