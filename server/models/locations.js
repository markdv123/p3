'use strict'
const { Model, INTEGER } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
   class Location extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
         Location.belongsTo( models.Memory, {
            foreignKey: 'memory_id'
         })
      }
   }
   Location.init(
      {
         memoryId: {
            field: 'memory_id',
            type: DataTypes.INTEGER,
            references: {
               model: 'memories',
               key: 'id',
            },
            onDelete: 'cascade'
         },
         lat: DataTypes.FLOAT,
         long: DataTypes.FLOAT,
      },
      {
         sequelize,
         modelName: 'Location',
         tableName: 'locations',
      }
   )
   return Location
}
