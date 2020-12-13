'use strict';
module.exports = (sequelize, DataTypes) => {
  const message = sequelize.define('Message', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    companyId: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    },
    message: {
      type: DataTypes.TEXT
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'Message',
  });
  message.associate = function (models) {
    // associations can be defined here
  };
  return message;
};