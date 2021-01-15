"use strict";
module.exports = (sequelize, DataTypes) => {
  const Resources = sequelize.define(
    "Resource",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false
      },
      file: {
        type: DataTypes.STRING
      }
    },
    {
      sequelize,
      modelName: "Resource",
    }
  );
  Resources.associate = function (models) {
    // associations
  };
  return Resources;
};
