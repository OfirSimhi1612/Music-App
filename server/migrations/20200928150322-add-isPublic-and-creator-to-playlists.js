'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'playlists',
      'is_public',
      {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    )

    await queryInterface.addColumn(
      'playlists',
      'creator',
      {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: null,
        references: { model: 'users', key: 'id' },
      }
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('playlists', 'is_public')
    await queryInterface.removeColumn('playlists', 'creator')
  }
};
