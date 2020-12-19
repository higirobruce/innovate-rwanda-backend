'use strict';
module.exports = (sequelize, DataTypes) => {
  const activitiesOfCompany = sequelize.define('ActivitiesOfCompany', {
    companyId: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
      references: {
        model: "Company",
        key: "id",
      },
    },
    activityId: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
      references: {
        model: "BusinessActivities",
        key: "id",
      },
    },
  }, {
    sequelize,
    modelName: 'ActivitiesOfCompany',
  });

  activitiesOfCompany.removeAttribute('id');

  activitiesOfCompany.associate = models => {
    activitiesOfCompany.belongsTo(models.Company, {
      foreignKey: 'companyId'
    });
    activitiesOfCompany.belongsTo(models.BusinessActivities, {
      foreignKey: 'activityId'
    });
  };
  return activitiesOfCompany;
};