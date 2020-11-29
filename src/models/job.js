'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Job extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Job.init({
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    companyId: DataTypes.INTEGER,
    category: DataTypes.STRING,
    tags: DataTypes.STRING,
    deadlineDate: DataTypes.DATE,
    deadlineTime: DataTypes.TIME,
    jobDetailsDocument: DataTypes.BLOB('long'),
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Job',
  });
  return Job;
};