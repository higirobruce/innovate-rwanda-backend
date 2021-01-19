"use strict";
module.exports = {
  up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.changeColumn(
        'Companies',
        'coType',
        {
          type: Sequelize.STRING,
          allowNull: true,
          references: {
            model: "CompanyTypes",
            key: "slug",
          },
        })
    ]);
  },

  down(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.changeColumn("Companies", "coType", {
        type: Sequelize.STRING
      })
    ]);
  },
};