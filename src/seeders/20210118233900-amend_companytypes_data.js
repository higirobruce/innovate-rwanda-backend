"use strict";
import db from "../models";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      db["CompanyTypes"].update(
        { name: "Startup Company", slug: "startupcompany" },
        { where: { slug: "Tech company" } }
      ),
      db["CompanyTypes"].update(
        { name: "Ecosystem Enabler", slug: "ecosystemenabler" },
        { where: { slug: "Enabler" } }
      ),
      db["CompanyTypes"].update(
        { name: "Government Agency", slug: "governmentagency" },
        { where: { slug: "Iamagovernmentagency" } }
      ),
      db["Company"].update(
        { coType: "startupcompany" },
        { where: { coType: "Tech company" } }
      ),
      db["Company"].update(
        { coType: "ecosystemenabler" },
        { where: { coType: "Enabler" } }
      ),
      db["Company"].update(
        { coType: "governmentagency" },
        { where: { coType: "Iamagovernmentagency" } }
      ),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      db["CompanyTypes"].update(
        { name: "I am a startup company", slug: "Tech company" },
        { where: { slug: "startupcompany" } }
      ),
      db["CompanyTypes"].update(
        { name: "I am an ecosystem enabler", slug: "Enabler" },
        { where: { slug: "ecosystemenabler" } }
      ),
      db["CompanyTypes"].update(
        { name: "I am a Government Agency", slug: "Iamagovernmentagency" },
        { where: { slug: "governmentagency" } }
      ),
      db["Company"].update(
        { coType: "Tech company" },
        { where: { coType: "startupcompany" } }
      ),
      db["Company"].update(
        { coType: "Enabler" },
        { where: { coType: "ecosystemenabler" } }
      ),
      db["Company"].update(
        { coType: "Iamagovernmentagency" },
        { where: { coType: "governmentagency" } }
      )
    ]);
  },
};