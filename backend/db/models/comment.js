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
        notEmpty: true,
        len: [1, 255]
      },
      type: DataTypes.STRING
    },
  }, {});
  Comment.prototype.toSafeObject = function() { // remember, this cannot be an arrow function
    const { id, userId, body, songId } = this; // context will be the User instance
    return { id, userId, body, songId } ;
  };
  Comment.associate = function(models) {
    // associations can be defined here
    Comment.belongsTo(models.User, {foreignKey: "userId"});
    Comment.belongsTo(models.Song, {foreignKey: "songId"});
  };
  return Comment;
};
