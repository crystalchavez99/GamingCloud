'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'demo@user.io',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password'),
        profilePicture: 'https://res.cloudinary.com/dreambssd/image/upload/v1654876274/143086968_2856368904622192_1959732218791162458_n.png_x7ofl2.png'
      },
      {
        email: 'user1@user.io',
        username: 'FakeUser1',
        hashedPassword: bcrypt.hashSync('password2'),
        profilePicture: 'https://res.cloudinary.com/dreambssd/image/upload/v1654876274/143086968_2856368904622192_1959732218791162458_n.png_x7ofl2.png'

      },
      {
        email: 'user2@user.io',
        username: 'FakeUser2',
        hashedPassword: bcrypt.hashSync('password3'),
        profilePicture: 'https://res.cloudinary.com/dreambssd/image/upload/v1654876274/143086968_2856368904622192_1959732218791162458_n.png_x7ofl2.png'

      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
