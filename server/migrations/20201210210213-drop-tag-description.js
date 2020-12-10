'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn ('tags', 'description')
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn ( 'tags', 'description', Sequelize.STRING)
  }
};
