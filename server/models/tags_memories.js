'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tags_memories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  tags_memories.init({
    tag_id: DataTypes.INTEGER,
    memory_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'tags_memories',
  });
  return tags_memories;
};