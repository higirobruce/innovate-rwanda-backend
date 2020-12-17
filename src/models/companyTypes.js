"use strict";
module.exports = (sequelize, DataTypes) => {
  const CompanyTypes = sequelize.define(
    "CompanyTypes",
    {
      name: DataTypes.STRING,
      slug: DataTypes.STRING,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "CompanyTypes",
    }
  );
  CompanyTypes.associate = function (models) {
    // associations
  };
  return CompanyTypes;
};