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
        foreignKey: 'artistId'
      });
      this.hasMany(models.Song, {
        foreignKey: 'artistId'
      });
    }
  };
  Artist.init({
    name: DataTypes.STRING,
    birthDate: DataTypes.DATEONLY,
    coverImg: DataTypes.TEXT,
    likes: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Artist',
    paranoid: true
  });
  return Artist;
};