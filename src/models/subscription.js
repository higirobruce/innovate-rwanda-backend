'use strict';
module.exports = (sequelize, DataTypes) => {
  const subscription = sequelize.define('Subscription', {
    email: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Subscription',
  });
  subscription.associate = function (models) {
    // associations can be defined here
  };
  return subscription;
};