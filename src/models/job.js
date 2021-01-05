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
    companyId: DataTypes.INTEGER,
    category: DataTypes.STRING,
    deadlineDate: DataTypes.DATE,
    deadlineTime: DataTypes.TIME,
    jobDetailsDocument: DataTypes.STRING,
    messages: DataTypes.ARRAY(DataTypes.TEXT),
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Job',
  });
  job.associate = models => {
    job.belongsTo(models.Company, {
      foreignKey: 'companyId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
    job.hasMany(models.AudienceForPost, { constraints: false });
  };
  return job;
};