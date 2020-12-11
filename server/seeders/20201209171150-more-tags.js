'use strict';
const {Op} = require('sequelize')

const tags = [
  { name: 'Cryptid Sighting'},
  { name: 'Family Event'},
  { name: 'Bar/Club'},
  { name: 'Spa/Resort'},
  { name: 'Museum'},
  { name: 'Zoo/Aquarium'},
  { name: 'Park'},
  { name: 'Swimming'},
  { name: 'Gym'},
  { name: 'Library'},
  { name: 'Event'},
  { name: 'Hometown'},
  { name: 'Medical'},
]

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('tags', tags)
 },

 down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('tags', {where: {id: {[Op.gt]: 8}}})
 },
};
