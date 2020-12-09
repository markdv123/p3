'use strict';
const {Op} = require('sequelize')

const tags = [
  { name: 'Cryptid Sighting', description: 'Cryptid Sighting' },
  { name: 'Family Event', description: 'Family Event' },
  { name: 'Bar/Club', description: 'Bar/Club' },
  { name: 'Spa/Resort', description: 'Spa/Resort' },
  { name: 'Museum', description: 'Museum' },
  { name: 'Zoo/Aquarium', description: 'Zoo/Aquarium' },
  { name: 'Park', description: 'Park' },
  { name: 'Swimming', description: 'Swimming' },
  { name: 'Gym', description: 'Gym' },
  { name: 'Library', description: 'Library' },
  { name: 'Event', description: 'Event' },
  { name: 'Hometown', description: 'Hometown' },
  { name: 'Medical', description: 'Medical' },
]

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('tags', tags)
 },

 down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('tags', {where: {id: {[Op.gt]: 8}}})
 },
};
