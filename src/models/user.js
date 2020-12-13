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
  user.associate = models => {
    user.hasMany(models.Blog, {
      foreignKey: 'author',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
    user.hasMany(models.Event, {
      foreignKey: 'author',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };
  return user;
};
