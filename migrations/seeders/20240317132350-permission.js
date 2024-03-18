"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Permission", [
      {
        id: 1,
        modality: true,
        action: "manage",
        subjectId: 19,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        modality: true,
        action: "manage",
        subjectId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        modality: true,
        action: "manage",
        subjectId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Permission", null, {});
  },
};
