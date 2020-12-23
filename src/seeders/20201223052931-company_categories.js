"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert(
      "CompanyCategories",
      [
        { name: "Tech companies", createdAt: new Date(), updatedAt: new Date()},
        { name: "Co-working spaces", createdAt: new Date(), updatedAt: new Date()},
        { name: "Business networks", createdAt: new Date(), updatedAt: new Date()},
        { name: "Accelerators", createdAt: new Date(), updatedAt: new Date()},
        { name: "Government agencies", createdAt: new Date(), updatedAt: new Date()},
        { name: "Ecosystem builders", createdAt: new Date(), updatedAt: new Date()},
        { name: "Financer/Investors", createdAt: new Date(), updatedAt: new Date()},
        { name: "Academic/Research institutions", createdAt: new Date(), updatedAt: new Date()},
        { name: "Incubators", createdAt: new Date(), updatedAt: new Date()},
        { name: "Talent Development", createdAt: new Date(), updatedAt: new Date()},
      ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("CompanyCategories", null, {});
  },
};
