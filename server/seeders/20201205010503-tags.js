'use strict'

const tags = [
   { name: 'Future Memory', description: 'Future Memory' },
   { name: 'Restaurant', description: 'Restaurant' },
   { name: 'Monument', description: 'Monument' },
   { name: 'View', description: 'View' },
   { name: 'Vacation', description: 'Vacation' },
   { name: 'Shopping', description: 'Shopping' },
   { name: 'Hike', description: 'Hike' },
   { name: 'Concert', description: 'Concert' },
]

module.exports = {
   up: async (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('tags', tags)
   },

   down: async (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('tags')
   },
}
