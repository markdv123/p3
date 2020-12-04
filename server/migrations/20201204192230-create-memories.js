'use strict'
module.exports = {
   up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('memories', {
         id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
         },
         userId: {
            field: 'user_id',
            type: Sequelize.INTEGER,
            references: {
               model: 'users',
               key: 'id',
            },
            allowNull: false,
         },
         name: {
            type: Sequelize.STRING,
            allowNull: false,
         },
         description: {
            type: Sequelize.STRING,
            allowNull: false,
         },
         public: {
            type: Sequelize.BOOLEAN,
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
      await queryInterface.dropTable('memories')
   },
}
