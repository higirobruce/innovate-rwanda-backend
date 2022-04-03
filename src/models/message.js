

module.exports = (sequelize, DataTypes) => {
  const message = sequelize.define('Message', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    companyId: {
      type: DataTypes.INTEGER
    },
    email: {
      type: DataTypes.STRING
    },
    message: {
      type: DataTypes.TEXT
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
    modelName: 'Message',
  });
  message.associate = (models) => {
    // associations can be defined here
    message.belongsTo(models.Company, {
      as: 'company',
      foreignKey: 'companyId'
    });
  };
  return message;
};
