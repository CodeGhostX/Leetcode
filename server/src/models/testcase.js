'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Testcase extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Problem, {
        foreignKey: "problemId",
      }),
      this.belongsTo(models.ExpectedOutput, {
        foreignKey: "expectedOutputId",
      })
    }
  }
  Testcase.init({
    test: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    problemId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
    expectedOutputId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    }
  }, {
    sequelize,
    modelName: 'Testcase',
  });
  return Testcase;
};