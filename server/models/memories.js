'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
   class Memory extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
         Memory.belongsTo(models.User, {
            foriegnKey: 'user_id',
         })
         Memory.hasOne(models.Location, {
            foreignKey: 'memory_id',
            as: 'locations'
         })
         Memory.belongsToMany(models.Tag, {
            through: 'tags_memories',
            foreignKey: 'memory_id',
            as: 'tags',
         })
      }
   }
   Memory.init(
      {
         userId: {
            field: 'user_id',
            type: DataTypes.INTEGER,
            references: {
               model: 'users',
               key: 'id',
            },
         },
         name: DataTypes.STRING,
         description: DataTypes.STRING,
         public: DataTypes.BOOLEAN,
      },
      {
         sequelize,
         modelName: 'Memory',
         tableName: 'memories',
      }
   )
   return Memory
}
