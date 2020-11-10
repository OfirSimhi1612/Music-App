'use strict';

const { sequelize } = require("../models");

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.addColumn(
      'artists',
      'deleted_at',
      {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null
      }
    )
    await queryInterface.addColumn(
      'albums',
      'deleted_at',
      {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null
      }
    )
    await queryInterface.addColumn(
      'playlists',
      'deleted_at',
      {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null
      }
    )
    await queryInterface.addColumn(
      'songs',
      'deleted_at',
      {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null
      }
    )
    await queryInterface.addColumn(
      'songs_in_playlists',
      'deleted_at',
      {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null
      }
    )

    return
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('artists', 'deleted_at')
    await queryInterface.removeColumn('artists', 'deleted_at')
    await queryInterface.removeColumn('artists', 'deleted_at')
    await queryInterface.removeColumn('artists', 'deleted_at')
    await queryInterface.removeColumn('artists', 'deleted_at')
    return

  }
};
