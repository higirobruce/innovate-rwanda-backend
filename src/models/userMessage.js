module.exports = (sequelize, DataTypes) => {
  const UserMessage = sequelize.define('UserMessage', {
    id: {
      allowNull: false,
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    recipientId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    lastMessageId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    unreadMessagesCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    }
  }, {
    sequelize,
    tableName: 'UserMessages',
    modelName: 'UserMessage',
    timestamps: true,
  });

  UserMessage.associate = (models) => {
    UserMessage.belongsTo(models.User, {
      as: 'sender',
      foreignKey: 'userId'
    });
    UserMessage.belongsTo(models.Message, {
      as: 'lastMessage',
      foreignKey: 'lastMessageId'
    });

    UserMessage.belongsTo(models.User, {
      as: 'recipient',
      foreignKey: 'recipientId'
    });
  };
};
