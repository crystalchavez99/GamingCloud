'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    userId: {
      validate: {
        notEmpty: true
      },
      type: DataTypes.INTEGER
    },
    songId: {
      validate: {
        notEmpty: true
      },
      type: DataTypes.INTEGER
    },
    body: {
      validate: {
        notEmpty: true
      },
      type: DataTypes.STRING
    },
  }, {});
  Comment.associate = function(models) {
    // associations can be defined here
    Comment.belongsTo(models.User, {foreignKey: "userId"});
    Comment.belongsTo(models.Song, {foreignKey: "songId"});
  };
  return Comment;
};
