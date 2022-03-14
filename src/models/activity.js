

module.exports = (sequelize, DataTypes) => {
  const Activity = sequelize.define('Activity', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Activity',
    tableName: 'Activities'
  });
  Activity.associate = (models) => {
    // associations can be defined here
    Activity.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'userId'
    });
  };
  return Activity;
};
