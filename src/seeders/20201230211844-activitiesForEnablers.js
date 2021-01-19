"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert(
      "BusinessActivities",
      [
        { name: "Co-Working Spaces", createdAt: new Date(), updatedAt: new Date()},
        { name: "Business Networks", createdAt: new Date(), updatedAt: new Date()},
        { name: "Accelerators", createdAt: new Date(), updatedAt: new Date()},
        { name: "Government Agencies", createdAt: new Date(), updatedAt: new Date()},
        { name: "Ecosystem Builders", createdAt: new Date(), updatedAt: new Date()},
        { name: "Financer/Investors", createdAt: new Date(), updatedAt: new Date()},
        { name: "Academic/Research Institutions", createdAt: new Date(), updatedAt: new Date()},
        { name: "Incubators", createdAt: new Date(), updatedAt: new Date()},
        { name: "Talent Development", createdAt: new Date(), updatedAt: new Date()},
      ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("BusinessActivities", null, {});
  },
};
