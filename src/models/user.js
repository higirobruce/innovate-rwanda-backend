'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('User', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    jobTitle: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
    companyId: DataTypes.INTEGER,
    resetLink: DataTypes.STRING,
    lastActivity: DataTypes.DATE,
    status: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });
  user.associate = function (models) {
    // associations can be defined here
  };
  return user;
};
