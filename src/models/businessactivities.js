"use strict";
module.exports = (sequelize, DataTypes) => {
  const BusinessActivities = sequelize.define(
    "BusinessActivities",
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "BusinessActivities",
    }
  );
  BusinessActivities.associate = function (models) {
    // associations can be defined here
  };
  return BusinessActivities;
};
