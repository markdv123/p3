'use strict'

const tags = [
   { name: 'Future Memory'},
   { name: 'Restaurant'},
   { name: 'Monument'},
   { name: 'View'},
   { name: 'Vacation'},
   { name: 'Shopping'},
   { name: 'Hike'},
   { name: 'Concert'},
]

module.exports = {
   up: async (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('tags', tags)
   },

   down: async (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('tags')
   },
}
