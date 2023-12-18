'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Address', [
      {
        id: 1,
        clientId: 3,
        index: '000000',
        city: 'Moscow',
        district: 'North',
        street: 'Lenina',
        building: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        clientId: 3,
        index: '000000',
        city: 'Saint-Petersburg',
        district: 'North',
        street: 'Lenina',
        building: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        clientId: 3,
        index: '000000',
        city: 'Novosibirsk',
        district: 'North',
        street: 'Lenina',
        building: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Address', null, {});
  },
};
