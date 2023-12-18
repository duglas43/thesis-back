'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('DetailParam', [
      {
        detailId: 1,
        paramId: 1,
        value: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        detailId: 2,
        paramId: 2,
        value: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        detailId: 3,
        paramId: 3,
        value: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('DetailParam', null, {});
  },
};
