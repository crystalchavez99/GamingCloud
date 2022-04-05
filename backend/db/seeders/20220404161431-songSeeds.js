'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Songs', [
      {
        userId: 1,
        songCover: 'https://i.scdn.co/image/ab67616d0000b2739f31553286bd249a902b50d4',
        url: 'https://res.cloudinary.com/dreambssd/video/upload/v1649091553/Stardew_Valley_OST_-_Stardew_Valley_Overture_fd1jmc.mp4',
        title: 'Demo-Song',
        genre: 'spring '
      },
    ], {});
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Songs', null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
