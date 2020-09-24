const { Playlist } = require('./')

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Songs_in_playlist extends Model {

    static async getIndex(playlistId) {
      try {
        const index = await this.findAll({
          where: {
            playlistId: playlistId
          },
          attributes: [[sequelize.fn('COUNT', sequelize.col('id')), 'index']]
        })
        return index[0].index + 1
      } catch (error) {
        throw error.message
      }
    }

    static associate(models) {
      this.belongsTo(models.Song, {
        foreignKey: 'songId',
        onDelete: 'CASCADE'
      });
      this.belongsTo(models.Playlist, {
        foreignKey: 'playlistId',
        onDelete: 'CASCADE'
      });
    }
  };
  Songs_in_playlist.init({
    songId: DataTypes.INTEGER,
    playlistId: DataTypes.INTEGER,
    index: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Songs_in_playlist',
  });
  return Songs_in_playlist;
};