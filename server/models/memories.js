'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class memories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  memories.init({
    userId: DataTypes.INTEGER,
    locationId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    public: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'memories',
  });
  return memories;
};