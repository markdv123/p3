'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.addColumn ( 'users', 'map_style', Sequelize.STRING, {
        defaultValue: 'Streets'
     })
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.removeColumn( 'users', 'map_style' )
  }
};
