'use strict'

module.exports = {
   up: async (queryInterface, Sequelize) => {
      await queryInterface.changeColumn('locations', 'memoryId', {
         field: 'memory_id',
         type: Sequelize.INTEGER,
         references: {
            model: 'memories',
            key: 'id',
         },
         allowNull: false,
         onDelete: 'cascade',
      })
   },

   down: async (queryInterface, Sequelize) => {
      await queryInterface.changeColumn('locations', 'memoryId', {
         field: 'memory_id',
         type: Sequelize.INTEGER,
         references: {
            model: 'memories',
            key: 'id',
         },
         allowNull: false,
      })
   },
}
