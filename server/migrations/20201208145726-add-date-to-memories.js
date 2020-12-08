'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn( 'memories', 'date', Sequelize.DATE)
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.removeColumn( 'memories', 'date')
  }
};
