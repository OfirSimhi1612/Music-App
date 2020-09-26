'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Song extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Artist, {
        foreignKey: 'artistId',
        onDelete: 'CASCADE'
      });
      this.belongsTo(models.Album, {
        foreignKey: { name: 'albumId', allowNull: true },
        onDelete: 'SET NULL'
      });
      this.belongsToMany(models.Playlist, {
        through: models.Songs_in_playlist,
        foreignKey: 'songId',
        onDelete: 'CASCADE'
      });
    }
  };
  Song.init({
    title: DataTypes.STRING,
    artistId: DataTypes.INTEGER,
    albumId: {
      type: DataTypes.INTEGER
    },
    lyrics: DataTypes.TEXT,
    length: DataTypes.TIME,
    releasedAt: DataTypes.DATEONLY,
    youtubeLink: DataTypes.TEXT,
    coverImg: DataTypes.TEXT,
    likes: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Song',
    paranoid: true
  });
  return Song;
};