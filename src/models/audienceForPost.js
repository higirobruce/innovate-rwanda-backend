'use strict';
module.exports = (sequelize, DataTypes) => {
  const audienceForPost = sequelize.define('AudienceForPost', {
    typeOfPost: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING,
    },
    postId: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    activityId: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
  }, {
    sequelize,
    modelName: 'AudienceForPost',
  });

  audienceForPost.removeAttribute('id');

  audienceForPost.associate = models => {
    audienceForPost.belongsTo(models.Blog, { 
      foreignKey: 'postId'
    });
    audienceForPost.belongsTo(models.Event, { 
      foreignKey: 'postId', constraints: false 
    });
    audienceForPost.belongsTo(models.Job, { 
      foreignKey: 'postId', constraints: false 
    });
    audienceForPost.belongsTo(models.BusinessActivities, {
      foreignKey: 'activityId'
    });
  };
  return audienceForPost;
};