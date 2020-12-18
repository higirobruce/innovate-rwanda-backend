'use strict';
module.exports = (sequelize, DataTypes) => {
  const subscription = sequelize.define('Subscription', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    email: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING
    },
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