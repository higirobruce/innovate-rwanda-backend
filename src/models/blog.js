'use strict';
module.exports = (sequelize, DataTypes) => {
  const blog = sequelize.define('Blog', {
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    category: DataTypes.STRING,
    tags: DataTypes.STRING,
    companyId: DataTypes.STRING,
    author: DataTypes.STRING,
    image: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Blog',
  });
  blog.associate = function (models) {
    // associations can be defined here
  };
  return blog;
};