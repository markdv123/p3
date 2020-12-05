'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   await queryInterface.removeConstraint ( 'locations', 'locations_memory_id_fkey') 
  },

  down: async (queryInterface, Sequelize) => {

}
};
