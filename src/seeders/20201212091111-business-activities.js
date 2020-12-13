"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "BusinessActivities",
      [
        {
          name: "Consumer software",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Enterprise software",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Software as a service",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        { name: "UX-IU", createdAt: new Date(), updatedAt: new Date() },
        { name: "IOT", createdAt: new Date(), updatedAt: new Date() },
        { name: "Fintec", createdAt: new Date(), updatedAt: new Date() },
        { name: "Insurtech", createdAt: new Date(), updatedAt: new Date() },
        {
          name: "Brand and retail platform",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        { name: "Mobility", createdAt: new Date(), updatedAt: new Date() },
        { name: "Health", createdAt: new Date(), updatedAt: new Date() },
        {
          name: "Supply chain and logistics",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Food and beverage",
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
        { name: "Agri-tec", createdAt: new Date(), updatedAt: new Date() },
        { name: "Safety tech", createdAt: new Date(), updatedAt: new Date() },
        { name: "3D printing", createdAt: new Date(), updatedAt: new Date() },
        {
          name: "AI & Machine learning",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        { name: "AR/VR/X", createdAt: new Date(), updatedAt: new Date() },
        {
          name: "Cloud computing",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        { name: "Cybersecurity", createdAt: new Date(), updatedAt: new Date() },
        { name: "Defense", createdAt: new Date(), updatedAt: new Date() },
        { name: "Virtualization", createdAt: new Date(), updatedAt: new Date() },
        {
          name: "Networking and wireless",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        { name: "Data center", createdAt: new Date(), updatedAt: new Date() },
        {
          name: "Infrastructure as a service (IaaS)",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Analytics and big dat",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Project management",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Application development",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Artificial intelligence",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        { name: "Blockchain", createdAt: new Date(), updatedAt: new Date() },
        { name: "Recruitment", createdAt: new Date(), updatedAt: new Date() },
        {
          name: "Embedded system",
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
