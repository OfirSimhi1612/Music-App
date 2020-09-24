'use strict';
const {
  Model
} = require('sequelize');
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
    }
  };
  Playlist.init({
    name: DataTypes.STRING,
    coverImg: DataTypes.TEXT,
    genre: DataTypes.STRING,
    likes: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Playlist',
    paranoid: true
  });
  return Playlist;
};