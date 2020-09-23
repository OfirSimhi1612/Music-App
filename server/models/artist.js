'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Artist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Album, {
        foreignKey: 'artist_id'
      });
      this.hasMany(models.Song, {
        foreignKey: 'artist_id'
      });
    }
  };
  Artist.init({
    name: DataTypes.STRING,
    birth_date: DataTypes.DATEONLY,
    cover_img: DataTypes.TEXT,
    likes: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Artist',
  });
  return Artist;
};