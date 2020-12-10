'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.changeColumn ('memories', 'description', {
        type: Sequelize.TEXT
     })
  },

  down: async (queryInterface, Sequelize) => {
   await queryInterface.changeColumn ('memories', 'description', {
      type: Sequelize.STRING
   })
  }
};
