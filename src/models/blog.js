'use strict';
module.exports = (sequelize, DataTypes) => {
  const blog = sequelize.define('Blog', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    category: DataTypes.STRING,
    companyId: DataTypes.INTEGER,
    author: DataTypes.INTEGER,
    image: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Blog',
  });

  blog.associate = models => {
    blog.belongsTo(models.Company, {
      foreignKey: 'companyId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
    blog.belongsTo(models.User, {
      foreignKey: 'author',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
    blog.hasMany(models.AudienceForPost, { constraints: false });
  };
  return blog;
};