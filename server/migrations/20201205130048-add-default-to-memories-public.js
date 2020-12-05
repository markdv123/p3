'use strict'

module.exports = {
   up: async (queryInterface, Sequelize) => {
      await queryInterface.changeColumn('memories', 'public', {
         type: Sequelize.BOOLEAN,
         allowNull: false,
         defaultValue: false,
      })
   },

   down: async (queryInterface, Sequelize) => {
      await queryInterface.changeColumn('memories', 'public', {
         type: Sequelize.BOOLEAN,
         allowNull: false,
         defaultValue: null,
      })
   },
}
