'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ExpectedOutput extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Testcase, {
        foreignKey: "expectedOutputId",
        onDelete: "CASCADE"
      })
    }
  }
  ExpectedOutput.init({
    expectedAns: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'ExpectedOutput',
  });
  return ExpectedOutput;
};