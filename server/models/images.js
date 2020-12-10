'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Image.belongsTo( models.Memory, {
         foreignKey: 'memory_id'         
      })
   }
  };
  Image.init({
    memoryId: {
      field: 'memory_id',
      type: DataTypes.INTEGER,
      references: {
         model: 'memories',
         key: 'id',
      },
      onDelete: 'cascade'
   },
    url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Image',
    tableName: 'images'
  });
  return Image;
};