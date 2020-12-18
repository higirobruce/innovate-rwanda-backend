"use strict";
module.exports = (sequelize, DataTypes) => {
  const BusinessActivities = sequelize.define(
    "BusinessActivities",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING
      },
    },
    {
      sequelize,
      modelName: "BusinessActivities",
    }
  );
  BusinessActivities.associate = function (models) {
    // associations
  };
  return BusinessActivities;
};
