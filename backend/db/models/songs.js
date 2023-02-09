'use strict';
module.exports = (sequelize, DataTypes) => {
  const Song = sequelize.define('Song', {
    userId: {
      validate: {
        notEmpty: true
      },
      type: DataTypes.INTEGER
    },
    songCover: DataTypes.STRING,
    url: DataTypes.STRING,
    title: {
      validate: {
        notEmpty: true,
        len: [1,50]
      },
      type: DataTypes.STRING(50)
    },
    genre: {
      validate: {
        notEmpty: true,
        len: [1,50]
    },
      type: DataTypes.STRING(50)
    },
  }, {});
  Song.associate = function(models) {
    // associations can be defined here
    Song.belongsTo(models.User, {foreignKey: 'userId'});
    Song.hasMany(models.Comment, {foreignKey: 'songId', onDelete: 'cascade',hooks:true})
  };
  return Song;
};
