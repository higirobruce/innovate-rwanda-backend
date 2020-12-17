"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "CompanyTypes",
      [
        {
          name: "I am a startup company",
          slug: 'Tech company',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "I am an ecosystem enabler",
          slug:'Enabler',
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("CompanyTypes", null, {});
  },
};