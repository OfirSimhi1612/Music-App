'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Album extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Song, {
        foreignKey: 'album_id'
      });
      this.belongsTo(models.Artist, {
        foreignKey: 'artist_id',
        onDelete: 'CASCADE'
      })
    }
  };
  Album.init({
    name: DataTypes.STRING,
    artist_id: DataTypes.INTEGER,
    published_at: DataTypes.DATEONLY,
    cover_img: DataTypes.TEXT,
    likes: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Album',
  });
  return Album;
};