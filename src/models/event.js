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
    flyer: DataTypes.STRING,
    eventDate: DataTypes.DATE,
    eventTime: DataTypes.TIME,
    companyId: DataTypes.INTEGER,
    author: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Event',
  });
  event.associate = models => {
    event.belongsTo(models.Company, {
      foreignKey: 'companyId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
    event.belongsTo(models.User, {
      foreignKey: 'author',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
    event.hasMany(models.AudienceForPost, { constraints: false });
  };
  return event;
};