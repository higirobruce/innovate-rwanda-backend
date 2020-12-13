'use strict';
module.exports = (sequelize, DataTypes) => {
  const company = sequelize.define('Company', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    coName: DataTypes.STRING,
    coType: DataTypes.STRING,
    coWebsite: DataTypes.STRING,
    districtBasedIn: DataTypes.STRING,
    areaOfInterest: DataTypes.STRING,
    shortDescription: DataTypes.TEXT,
    logo: DataTypes.STRING,
    yearFounded: DataTypes.INTEGER,
    contactEmail: DataTypes.STRING,
    contactPhone: DataTypes.STRING,
    mainAreaOfInterest: DataTypes.STRING,
    customerBase: DataTypes.STRING,
    socialMedia: DataTypes.STRING,
    emailDisplay: DataTypes.BOOLEAN,
    phoneDisplay: DataTypes.BOOLEAN,
    officeAddress: DataTypes.STRING,
    slug: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Company',
  });
  company.associate = models => {
    company.hasMany(models.Blog, {
      foreignKey: 'companyId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
    company.hasMany(models.Event, {
      foreignKey: 'companyId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
    company.hasMany(models.Job, {
      foreignKey: 'companyId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };
  return company;
};