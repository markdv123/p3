'use strict'
module.exports = {
   up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('locations', {
         id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
         },
         memoryId: {
            field: 'memory_id',
            type: Sequelize.INTEGER,
            references: {
               model: 'memories',
               key: 'id',
            },
            allowNull: false,
         },
         lat: {
            type: Sequelize.FLOAT,
            allowNull: false,
         },
         long: {
            type: Sequelize.FLOAT,
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
      await queryInterface.dropTable('locations')
   },
}
