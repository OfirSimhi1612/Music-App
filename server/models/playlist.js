'use strict';
const {
  Model
} = require('sequelize');
const { default: Song } = require('../../client/music-app/src/components/Pages/Song');
module.exports = (sequelize, DataTypes) => {
  class Playlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      this.belongsToMany(models.Song, {
        through: models.Songs_in_playlist,
        foreignKey: 'playlistId',
        onDelete: 'CASCADE'
      });

      this.belongsTo(models.User, {
        foreignKey: 'creator'
      })
    }
  };
  Playlist.init({
    name: DataTypes.STRING,
    coverImg: DataTypes.TEXT,
    genre: DataTypes.STRING,
    likes: DataTypes.INTEGER,
    isPublic: DataTypes.BOOLEAN,
    creator: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Playlist',
    paranoid: true
  });
  return Playlist;
};
