"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("User", [
      {
        id: 1,
        email: "admin@mail.com",
        passwordHash:
          "$2b$05$m599jM38aIsCCqumbkUl2.6UQcetFz5QJxqj1k5Gi/4qPf9pTWsaq",
        refreshToken: null,
        firstName: "ADMIN",
        lastName: "ADMIN",
        patronymic: "ADMIN",
        language: "RU",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        email: "enginner@mail.com",
        passwordHash:
          "$2b$05$m599jM38aIsCCqumbkUl2.6UQcetFz5QJxqj1k5Gi/4qPf9pTWsaq",
        refreshToken: null,
        firstName: "ENGINEER",
        lastName: "ENGINEER",
        patronymic: "ENGINEER",
        language: "RU",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        email: "client@mail.com",
        passwordHash:
          "$2b$05$m599jM38aIsCCqumbkUl2.6UQcetFz5QJxqj1k5Gi/4qPf9pTWsaq",
        refreshToken: null,
        firstName: "CLIENT",
        lastName: "CLIENT",
        patronymic: "CLIENT",
        language: "RU",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        email: "hr@mail.com",
        passwordHash:
          "$2b$05$m599jM38aIsCCqumbkUl2.6UQcetFz5QJxqj1k5Gi/4qPf9pTWsaq",
        refreshToken: null,
        firstName: "HR",
        lastName: "HR",
        patronymic: "HR",
        language: "RU",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 5,
        email: "manager@mail.com",
        passwordHash:
          "$2b$05$m599jM38aIsCCqumbkUl2.6UQcetFz5QJxqj1k5Gi/4qPf9pTWsaq",
        refreshToken: null,
        firstName: "MANAGER",
        lastName: "MANAGER",
        patronymic: "MANAGER",
        language: "RU",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete("User", null, {});
  },
};
