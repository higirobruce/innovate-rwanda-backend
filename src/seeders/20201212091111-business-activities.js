"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "BusinessActivities",
      [
        {
          name: "Consumer Software",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Enterprise Software",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Software As A Service",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        { name: "UX-IU", createdAt: new Date(), updatedAt: new Date() },
        { name: "IOT", createdAt: new Date(), updatedAt: new Date() },
        { name: "FinTech", createdAt: new Date(), updatedAt: new Date() },
        { name: "Insurtech", createdAt: new Date(), updatedAt: new Date() },
        {
          name: "Brand and Retail Platform",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        { name: "Mobility", createdAt: new Date(), updatedAt: new Date() },
        { name: "Health", createdAt: new Date(), updatedAt: new Date() },
        {
          name: "Supply Chain and Logistics",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Food and Beverage",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Tourism and Hospitality",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        { name: "Energy", createdAt: new Date(), updatedAt: new Date() },
        { name: "Smart cities", createdAt: new Date(), updatedAt: new Date() },
        { name: "Media & A", createdAt: new Date(), updatedAt: new Date() },
        { name: "Agri-Tech", createdAt: new Date(), updatedAt: new Date() },
        { name: "Safety Tech", createdAt: new Date(), updatedAt: new Date() },
        { name: "3D Printing", createdAt: new Date(), updatedAt: new Date() },
        {
          name: "AI & Machine Learning",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        { name: "AR/VR/X", createdAt: new Date(), updatedAt: new Date() },
        {
          name: "Cloud Computing",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        { name: "Cybersecurity", createdAt: new Date(), updatedAt: new Date() },
        { name: "Defense", createdAt: new Date(), updatedAt: new Date() },
        { name: "Virtualization", createdAt: new Date(), updatedAt: new Date() },
        {
          name: "Networking and Wireless",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        { name: "Data Center", createdAt: new Date(), updatedAt: new Date() },
        {
          name: "Infrastructure As A Service (IaaS)",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Analytics and Big Data",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Project Management",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Application Development",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Artificial Intelligence",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        { name: "Blockchain", createdAt: new Date(), updatedAt: new Date() },
        { name: "Recruitment", createdAt: new Date(), updatedAt: new Date() },
        {
          name: "Embedded System",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("BusinessActivities", null, {});
  },
};
