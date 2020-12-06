'use strict';
module.exports = (sequelize, DataTypes) => {
  const message = sequelize.define('Message', {
    companyId: DataTypes.STRING,
    email: DataTypes.STRING,
    message: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Message',
  });
  message.associate = function (models) {
    // associations can be defined here
  };
  return message;
};