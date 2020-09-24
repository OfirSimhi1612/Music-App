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
        foreignKey: 'albumId'
      });
      this.belongsTo(models.Artist, {
        foreignKey: 'artistId',
        onDelete: 'CASCADE'
      })
    }
  };
  Album.init({
    name: DataTypes.STRING,
    artistId: DataTypes.INTEGER,
    publishedAt: DataTypes.DATEONLY,
    coverImg: DataTypes.TEXT,
    likes: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Album',
  });
  return Album;
};