'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Param', [
      {
        id: 1,
        name: 'Mass',
        unit: 'kg',
        type: 'number',
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        id: 2,
        name: 'Length',
        unit: 'mm',
        type: 'number',
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        id: 3,
        name: 'Width',
        unit: 'mm',
        type: 'number',
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        id: 4,
        name: 'Height',
        unit: 'mm',
        type: 'number',
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        id: 5,
        name: 'Diameter',
        unit: 'mm',
        type: 'number',
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        id: 6,
        name: 'Thickness',
        unit: 'mm',
        type: 'number',
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        id: 7,
        name: 'Volume',
        unit: 'm3',
        type: 'number',
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        id: 8,
        name: 'Color',
        unit: '',
        type: 'string',
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        id: 9,
        name: 'Material',
        unit: '',
        type: 'string',
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        id: 10,
        name: 'Power',
        unit: 'kW',
        type: 'number',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Param', null, {});
  },
};
