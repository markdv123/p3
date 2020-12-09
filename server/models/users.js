'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
        static associate(models) {
         User.hasMany( models.Memory, {
            foreignKey: 'user_id',
            as: 'memories'
         })
    }
  };
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    mapStyle: {
       field: 'map_style',
       type: DataTypes.STRING,
       allowNulls: false,
       defaultValue: 'Streets'
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users'
  });
  return User;
};