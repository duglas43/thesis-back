"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Subject", [
      {
        id: 1,
        name: "User",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        name: "Machine",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        name: "Detail",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        name: "Param",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 5,
        name: "DetailParam",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 6,
        name: "MachineDetail",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 7,
        name: "Address",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 8,
        name: "Order",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 9,
        name: "OrderMachine",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 10,
        name: "Role",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 11,
        name: "UserRole",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 12,
        name: "Subject",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 13,
        name: "Permission",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 14,
        name: "PermissionField",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 15,
        name: "PermissionCondition",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 16,
        name: "RolePermission",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 17,
        name: "UserPermission",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 18,
        name: "Page",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 19,
        name: "all",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Subject", null, {});
  },
};
