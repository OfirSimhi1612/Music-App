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
        foreignKey: 'artist_id',
        onDelete: 'CASCADE'
      });
      this.belongsTo(models.Album, {
        foreignKey: { name: 'album_id', allowNull: true },
        onDelete: 'SET NULL'
      });
      this.hasMany(models.Songs_in_playlist, {
        foreignKey: 'song_id'
      });
    }
  };
  Song.init({
    title: DataTypes.STRING,
    artist_id: DataTypes.INTEGER,
    album_id: DataTypes.INTEGER,
    lyrics: DataTypes.TEXT,
    length: DataTypes.TIME,
    released_at: DataTypes.DATEONLY,
    youtube_link: DataTypes.TEXT,
    cover_img: DataTypes.TEXT,
    likes: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Song',
  });
  return Song;
};