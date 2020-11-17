const artist = require('../seedFiles/artist.json')
const album = require('../seedFiles/album.json')
const playlist = require('../seedFiles/playlist.json')
const song = require('../seedFiles/song.json')
const user = require('../seedFiles/user.json')


'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', user);
    await queryInterface.bulkInsert('artists', artist);
    await queryInterface.bulkInsert('albums', album);
    await queryInterface.bulkInsert('playlists', playlist);
    await queryInterface.bulkInsert('songs', song);
    return
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
