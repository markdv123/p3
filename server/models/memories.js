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
            as: 'user'
         })
         Memory.hasOne(models.Location, {
            foreignKey: 'memory_id',
            as: 'location'
         })
         Memory.belongsToMany(models.Tag, {
            through: 'tags_memories',
            foreignKey: 'memory_id',
            as: 'tags',
         })
         Memory.hasMany(models.Image, {
            foreignKey: 'memory_id',
            as: 'images'
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
         description: DataTypes.TEXT,
         public: DataTypes.BOOLEAN,
         date: DataTypes.DATE
      },
      {
         sequelize,
         modelName: 'Memory',
         tableName: 'memories',
      }
   )
   return Memory
}
