'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('songs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      artist_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        references: { model: 'artists', key: 'id' }
      },
      album_id: {
        type: Sequelize.INTEGER,
        onDelete: 'SET NULL',
        references: { model: 'albums', key: 'id' }
      },
      lyrics: {
        type: Sequelize.TEXT
      },
      length: {
        type: Sequelize.TIME,
        defaultValue: "00:00:00"
      },
      released_at: {
        type: Sequelize.DATEONLY
      },
      youtube_link: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      cover_img: {
        type: Sequelize.TEXT
      },
      likes: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('songs');
  }
};