"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert(
      "EventsTypes",
      [
        { name: "Conference", createdAt: new Date(), updatedAt: new Date()},
        { name: "Hackathon", createdAt: new Date(), updatedAt: new Date()},
        { name: "Design challenge", createdAt: new Date(), updatedAt: new Date()},
        { name: "Solvathone", createdAt: new Date(), updatedAt: new Date()},
        { name: "Pitch event", createdAt: new Date(), updatedAt: new Date()},
        { name: "Townhall", createdAt: new Date(), updatedAt: new Date()},
        { name: "Launch event", createdAt: new Date(), updatedAt: new Date()},
        { name: "Workshop", createdAt: new Date(), updatedAt: new Date()},
        { name: "Training", createdAt: new Date(), updatedAt: new Date()},
        { name: "Coaching", createdAt: new Date(), updatedAt: new Date()},
        { name: "Webinar", createdAt: new Date(), updatedAt: new Date()},
        { name: "Meetup", createdAt: new Date(), updatedAt: new Date()},
        { name: "Expo", createdAt: new Date(), updatedAt: new Date()},
      ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("EventsTypes", null, {});
  },
};
