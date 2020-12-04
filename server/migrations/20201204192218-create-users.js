'use strict'
module.exports = {
   up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('users', {
         id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
         },
         name: {
            type: Sequelize.STRING,
            allowNull: false,
         },
         email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
         },
         password: {
            type: Sequelize.STRING,
            allowNull: false,
         },
         createdAt: {
            field: 'created_at',
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: new Date(),
         },
         updatedAt: {
            field: 'updated_at',
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: new Date(),
         },
      })
   },
   down: async (queryInterface, Sequelize) => {
      await queryInterface.dropTable('users')
   },
}
