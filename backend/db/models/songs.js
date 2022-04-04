'use strict';
module.exports = (sequelize, DataTypes) => {
  const Songs = sequelize.define('Songs', {
    userId: DataTypes.INTEGER,
    albumId: DataTypes.INTEGER,
    url: DataTypes.STRING,
    title: DataTypes.STRING,
    genre: DataTypes.STRING
  }, {});
  Songs.associate = function(models) {
    // associations can be defined here
  };
  return Songs;
};