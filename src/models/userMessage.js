

module.exports = (sequelize, DataTypes) => {
  const UserMessage = sequelize.define('UserMessage', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: DataTypes.INTEGER,
    recipientId: DataTypes.INTEGER,
    lastMessageId: DataTypes.INTEGER,
    unreadMessagesCount: DataTypes.INTEGER,
  }, {
    sequelize,
    timestamps: true,
  });
  UserMessage.associate = (models) => {
    // associations can be defined here
    UserMessage.belongsTo(models.User, {
      as: 'sender',
      foreignKey: 'userId'
    });

    UserMessage.belongsTo(models.User, {
      as: 'recipient',
      foreignKey: 'recipientId',
    });

    UserMessage.belongsTo(models.Message, {
      as: 'lastMessage',
      foreignKey: 'lastMessageId'
    });
  };
  return UserMessage;
};
