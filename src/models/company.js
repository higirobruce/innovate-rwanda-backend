'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Company.init({
    coName: DataTypes.STRING,
    coType: DataTypes.STRING,
    coWebsite: DataTypes.STRING,
    districtBasedIn: DataTypes.STRING,
    areaOfInterest: DataTypes.STRING,
    shortDescription: DataTypes.TEXT,
    logo: DataTypes.BLOG,
    yearFounded: DataTypes.INTEGER,
    contactEmail: DataTypes.STRING,
    contactPhone: DataTypes.STRING,
    mainAreaOfInterest: DataTypes.STRING,
    customerBase: DataTypes.STRING,
    socialMedia: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Company',
  });
  return Company;
};