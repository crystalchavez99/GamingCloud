'use strict';
const { Validator } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 30],
        isNotEmail(value) {
          if (Validator.isEmail(value)) {
            throw new Error('Cannot be an email.');
          }
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 256]
      }
    },
    profilePicture: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'https://res.cloudinary.com/dreambssd/image/upload/v1654876274/143086968_2856368904622192_1959732218791162458_n.png_x7ofl2.png',
    },
    bio: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [0, 256]
      }
    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
      validate: {
        len: [60, 60]
      }
    }
  },
  {
    defaultScope: {
      attributes: {
        exclude: ['hashedPassword', 'email', 'createdAt', 'updatedAt']
      }
    },
    scopes: {
      currentUser: {
        attributes: { exclude: ['hashedPassword', 'updatedAt'] }
      },
      loginUser: {
        attributes: {}
      }
    }
  });

  User.prototype.toSafeObject = function() { // remember, this cannot be an arrow function
    const { id, username, email,profilePicture, bio } = this; // context will be the User instance
    return { id, username, email, profilePicture, bio};
  };
  User.prototype.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.hashedPassword.toString());
   };
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Song, {foreignKey: 'userId', onDelete: 'cascade',hooks:true});
    User.hasMany(models.Comment, {foreignKey: 'userId', onDelete: 'cascade',hooks:true});
  };
  User.getCurrentUserById = async function (id) {
    return await User.scope('currentUser').findByPk(id);
   };
   User.login = async function ({ credential, password }) {
    const { Op } = require('sequelize');
    const user = await User.scope('loginUser').findOne({
      where: {
        [Op.or]: {
          username: credential,
          email: credential
        }
      }
    });
    if (user && user.validatePassword(password)) {
      return await User.scope('currentUser').findByPk(user.id);
    }
  };
  User.signup = async function ({ username, email, password, profilePicture, bio}) {
    const hashedPassword = bcrypt.hashSync(password);
    const user = await User.create({
      username,
      email,
      hashedPassword,
      profilePicture,
      bio

    });
    return await User.scope('currentUser').findByPk(user.id);
  };
  return User;
};
