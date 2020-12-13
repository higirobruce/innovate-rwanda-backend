'use strict';
module.exports = (sequelize, DataTypes) => {
  const event = sequelize.define('Event', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    category: DataTypes.STRING,
    tags: DataTypes.STRING,
    flyer: DataTypes.STRING,
    eventDate: DataTypes.DATE,
    eventTime: DataTypes.TIME,
    companyId: DataTypes.STRING,
    author: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Event',
  });
  event.associate = function (models) {
    // associations can be defined here
  };
  return event;
};