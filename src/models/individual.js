

module.exports = (sequelize, DataTypes) => {
  const individual = sequelize.define('Individual', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    lastName: DataTypes.STRING,
    firstName: DataTypes.STRING,
    accType: DataTypes.STRING,
    shortDescription: DataTypes.TEXT,
    picture: DataTypes.STRING,
    location: DataTypes.STRING,
    portfolio: DataTypes.STRING,
    linkedin: DataTypes.STRING,
    slug: DataTypes.STRING,
    contactEmail: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING,
    },
    contactPhone: DataTypes.STRING,
    emailDisplay: DataTypes.BOOLEAN,
    phoneDisplay: DataTypes.BOOLEAN,
    status: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Individual',
  });
  individual.associate = (models) => {
    // associations
    individual.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'user_id'
    });
  };
  return individual;
};
