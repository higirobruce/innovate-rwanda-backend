'use strict';
module.exports = (sequelize, DataTypes) => {
  const event = sequelize.define('Event', {
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    category: DataTypes.STRING,
    tags: DataTypes.STRING,
    author: DataTypes.STRING,
    image: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Event',
  });
  event.associate = function(models) {
    // associations can be defined here
  };
  return event;
};