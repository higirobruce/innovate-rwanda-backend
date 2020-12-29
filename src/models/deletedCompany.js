'use strict';
module.exports = (sequelize, DataTypes) => {
  const deletedCompany = sequelize.define('DeletedCompany', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    data: {
      type: DataTypes.TEXT
    },
    recoveryToken: {
      type: DataTypes.STRING
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
    modelName: 'DeletedCompany',
  });
  deletedCompany.associate = function (models) {
    // associations
  };
  return deletedCompany;
};