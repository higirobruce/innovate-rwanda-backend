"use strict";
module.exports = (sequelize, DataTypes) => {
  const eventsTypes = sequelize.define(
    "EventsTypes",
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
      }
    },
    {
      sequelize,
      modelName: "EventsTypes",
    }
  );
  eventsTypes.associate = function (models) {
    // associations
  };
  return eventsTypes;
};