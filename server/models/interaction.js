'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Interaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      this.belongsTo(models.Song, {
        foreignKey: 'userId',
        onDelete: 'CASCADE'
      })

      this.belongsTo(models.User, {
        foreignKey: 'songId',
        onDelete: 'CASCADE'
      })
    }
  };
  Interaction.init({
    userId: DataTypes.INTEGER,
    songId: DataTypes.INTEGER,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Interaction',
    paranoid: true
  });
  return Interaction;
};