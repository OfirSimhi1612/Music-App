'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Songs_in_playlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Song, {
        foreignKey: 'songId'
      });
      this.belongsTo(models.Playlist, {
        foreignKey: 'playlistId'
      });
    }
  };
  Songs_in_playlist.init({
    song_id: DataTypes.INTEGER,
    playlist_id: DataTypes.INTEGER,
    index: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Songs_in_playlist',
  });
  return Songs_in_playlist;
};