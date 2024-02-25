"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("User", [
      {
        id: 1,
        email: "ADMIN",
        passwordHash:
          "$2b$05$m599jM38aIsCCqumbkUl2.6UQcetFz5QJxqj1k5Gi/4qPf9pTWsaq",
        refreshToken: null,
        firstName: "ADMIN",
        lastName: "ADMIN",
        patronymic: "ADMIN",
        language: "RU",
        phone: "+79999999999",
        lastVisit: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        email: "ENGINEER",
        passwordHash:
          "$2b$05$m599jM38aIsCCqumbkUl2.6UQcetFz5QJxqj1k5Gi/4qPf9pTWsaq",
        refreshToken: null,
        firstName: "ENGINEER",
        lastName: "ENGINEER",
        patronymic: "ENGINEER",
        language: "RU",
        phone: "+79999999999",
        lastVisit: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        email: "CLIENT",
        passwordHash:
          "$2b$05$m599jM38aIsCCqumbkUl2.6UQcetFz5QJxqj1k5Gi/4qPf9pTWsaq",
        refreshToken: null,
        firstName: "CLIENT",
        lastName: "CLIENT",
        patronymic: "CLIENT",
        language: "RU",
        phone: "+79999999999",
        lastVisit: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        email: "HR",
        passwordHash:
          "$2b$05$m599jM38aIsCCqumbkUl2.6UQcetFz5QJxqj1k5Gi/4qPf9pTWsaq",
        refreshToken: null,
        firstName: "HR",
        lastName: "HR",
        patronymic: "HR",
        language: "RU",
        phone: "+79999999999",
        lastVisit: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 5,
        email: "MANAGER",
        passwordHash:
          "$2b$05$m599jM38aIsCCqumbkUl2.6UQcetFz5QJxqj1k5Gi/4qPf9pTWsaq",
        refreshToken: null,
        firstName: "MANAGER",
        lastName: "MANAGER",
        patronymic: "MANAGER",
        language: "RU",
        phone: "+79999999999",
        lastVisit: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete("User", null, {});
  },
};
