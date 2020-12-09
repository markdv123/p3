'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   await queryInterface.bulkUpdate ( 'users', { 'map_style': 'Streets' }, {} )
   
  },

  down: async (queryInterface, Sequelize) => {
   await queryInterface.bulkUpdate ( 'users', { 'map_style': null }, {} )
  }
};
