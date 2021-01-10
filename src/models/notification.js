'use strict';
module.exports = (sequelize, DataTypes) => {
  const notification = sequelize.define('Notification', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    companyId: {
      type: DataTypes.INTEGER,
    },
    subject: {
      type: DataTypes.STRING
    },
    content: {
      type: DataTypes.TEXT
    },
    linkForMore: {
      type: DataTypes.STRING
    },
    firstread: {
      type: DataTypes.DATE
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'Notification',
  });
  notification.associate = function (models) {
    // associations
  };
  return notification;
};