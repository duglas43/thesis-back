'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Detail', [
      {
        id: 1,
        name: 'Detail 1',
        partNumber: '000000',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        name: 'Detail 2',
        partNumber: '000000',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        name: 'Detail 3',
        partNumber: '000000',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        name: 'Detail 4',
        partNumber: '000000',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 5,
        name: 'Detail 5',
        partNumber: '000000',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 6,
        name: 'Detail 6',
        partNumber: '000000',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 7,
        name: 'Detail 7',
        partNumber: '000000',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 8,
        name: 'Detail 8',
        partNumber: '000000',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 9,
        name: 'Detail 9',
        partNumber: '000000',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 10,
        name: 'Detail 10',
        partNumber: '000000',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 11,
        name: 'Detail 11',
        partNumber: '000000',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 12,
        name: 'Detail 12',
        partNumber: '000000',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 13,
        name: 'Detail 13',
        partNumber: '000000',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Detail', null, {});
  },
};
