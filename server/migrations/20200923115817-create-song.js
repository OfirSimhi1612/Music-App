'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Songs', {
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
        references: { model: 'artists', key: 'id', as: 'artistId' }
      },
      album_id: {
        type: Sequelize.INTEGER,
        onDelete: 'SET NULL',
        references: { model: 'albums', key: 'id', as: 'albumId' }
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
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Songs');
  }
};