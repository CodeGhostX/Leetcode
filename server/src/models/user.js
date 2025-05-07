'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate:{
        isAlphanumeric: true
      }
    },
    password: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate:{
        len:[6, 16] 
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate:{
        isEmail: true
      }
    },
    gender: {
      type: DataTypes.ENUM("MALE", "FEMALE", "OTHERS"),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};