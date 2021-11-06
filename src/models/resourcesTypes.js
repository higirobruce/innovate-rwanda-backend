"use strict";
module.exports = (sequelize, DataTypes) => {
  const ResourcesTypes = sequelize.define(
    "ResourcesTypes",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING
      },
      description: DataTypes.TEXT,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "ResourcesTypes",
    }
  );
  ResourcesTypes.associate = function (models) {
    // associations
  };
  return ResourcesTypes;
};