'use strict';
module.exports = (sequelize, DataTypes) => {
  const Song = sequelize.define('Song', {
    userId: {
      validate: {
        notEmpty: true
      },
      type: DataTypes.INTEGER
    },
    // albumId: DataTypes.INTEGER,
    url: DataTypes.STRING,
    title: {
      validate: {
        notEmpty: true
      },
      type: DataTypes.STRING(50)
    },
    genre: {
      validate: {
        notEmpty: true
    },
      type: DataTypes.STRING(50)
    },
  }, {});
  Song.associate = function(models) {
    // associations can be defined here
    Song.belongsTo(models.User,{foreignKey: 'userId'});
  };
  return Songs;
};
