'use strict'
module.exports = {
   up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('tags_memories', {
         id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
         },
         tag_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
               model: 'tags',
               key: 'id'
            },
            onDelete: 'cascade'
         },
         memory_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
               model: 'memories',
               key: 'id',
            },
            onDelete: 'cascade'
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
      await queryInterface.dropTable('tags_memories')
   },
}
