'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    jobTitle: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
    companyId: DataTypes.INTEGER,
    resetLink: DataTypes.STRING,
    status: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });
  user.associate = function(models) {
    // associations can be defined here
  };
  return user;
};
