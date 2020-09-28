'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    static async getTakenEmails() {
      try {
        const takenEmails = await this.findAll({
          attributes: ['email']
        })

        const takenEmailsArray = [];
        for (let email of takenEmails) {
          takenEmailsArray.push(email.email)
        }

        return takenEmailsArray

      } catch (error) {
        console.log(error);
      }
    }

    static associate(models) {

      this.hasMany(models.Playlist, {
        foreignKey: 'creator'
      })

      this.hasMany(models.Interaction, {
        foreignKey: 'userId',
        onDelete: 'CASCADE'
      })
    }
  };
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    birthDate: DataTypes.DATEONLY,
    password: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'User',
    paranoid: true
  });
  return User;
};