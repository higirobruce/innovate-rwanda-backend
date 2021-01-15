"use strict";
module.exports = (sequelize, DataTypes) => {
  const CompanyTypes = sequelize.define(
    "CompanyTypes",
    {
      name: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING
      },
      description: DataTypes.TEXT,
      slug: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING
      },
      image: DataTypes.STRING,
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