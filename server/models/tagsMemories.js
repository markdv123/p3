'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
   class TagMemory extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
         // define association here
      }
   }
   TagMemory.init(
      {
         tagId: {
            field: 'tag_id',
            type: DataTypes.INTEGER,
            references: {
               model: 'tags',
               key: 'id',
            },
         },
         memoryId: {
            field: 'memory_id',
            type: DataTypes.INTEGER,
            references: {
               model: 'memories',
               key: 'id',
            },
         },
      },
      {
         sequelize,
         modelName: 'TagMemory',
         tableName: 'tags_memories',
      }
   )
   return TagMemory
}
