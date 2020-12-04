'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {
    
    static associate(models) {
      Tag.belongsToMany(models.Memory, {
         through: 'tags_memories',
         foreignKey: 'tag_id',
         as: 'memories',
      })
    }
  };
  Tag.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Tag',
    tableName: 'tags'
  });
  return Tag;
};