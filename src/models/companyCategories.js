"use strict";
module.exports = (sequelize, DataTypes) => {
  const CompanyCategories = sequelize.define(
    "CompanyCategories",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING
      },
    },
    {
      sequelize,
      modelName: "CompanyCategories",
    }
  );
  CompanyCategories.associate = function (models) {
    // associations
  };
  return CompanyCategories;
};
