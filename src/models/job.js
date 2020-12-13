'use strict';
module.exports = (sequelize, DataTypes) => {
  const job = sequelize.define('Job', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    companyId: DataTypes.STRING,
    category: DataTypes.STRING,
    tags: DataTypes.STRING,
    deadlineDate: DataTypes.DATE,
    deadlineTime: DataTypes.TIME,
    jobDetailsDocument: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Job',
  });
  job.associate = function (models) {
    // associations can be defined here
  };
  return job;
};