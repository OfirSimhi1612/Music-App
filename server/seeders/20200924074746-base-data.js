const artist = require('../seedFiles/artist.json')
const album = require('../seedFiles/album.json')
const playlist = require('../seedFiles/playlist.json')
const song = require('../seedFiles/song.json')




'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Artists', artist);
    await queryInterface.bulkInsert('Albums', album);
    await queryInterface.bulkInsert('Playlists', playlist);
    await queryInterface.bulkInsert('Songs', song);
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
