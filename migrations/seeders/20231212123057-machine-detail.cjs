'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('MachineDetail', [
      {
        machineId: 1,
        detailId: 1,
        count: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        machineId: 2,
        detailId: 2,
        count: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        machineId: 3,
        detailId: 3,
        count: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('MachineDetail', null, {});
  },
};
