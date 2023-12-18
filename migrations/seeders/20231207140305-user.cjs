'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('User', [
      {
        id: 1,
        login: 'ADMIN',
        passwordHash:
          '$2b$05$m599jM38aIsCCqumbkUl2.6UQcetFz5QJxqj1k5Gi/4qPf9pTWsaq',
        refreshToken: null,
        firstName: 'ADMIN',
        lastName: 'ADMIN',
        patronymic: 'ADMIN',
        language: 'RU',
        email: '',
        phone: '+79999999999',
        lastVisit: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        login: 'ENGINEER',
        passwordHash:
          '$2b$05$m599jM38aIsCCqumbkUl2.6UQcetFz5QJxqj1k5Gi/4qPf9pTWsaq',
        refreshToken: null,
        firstName: 'ENGINEER',
        lastName: 'ENGINEER',
        patronymic: 'ENGINEER',
        language: 'RU',
        email: '',
        phone: '+79999999999',
        lastVisit: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        login: 'CLIENT',
        passwordHash:
          '$2b$05$m599jM38aIsCCqumbkUl2.6UQcetFz5QJxqj1k5Gi/4qPf9pTWsaq',
        refreshToken: null,
        firstName: 'CLIENT',
        lastName: 'CLIENT',
        patronymic: 'CLIENT',
        language: 'RU',
        email: '',
        phone: '+79999999999',
        lastVisit: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        login: 'HR',
        passwordHash:
          '$2b$05$m599jM38aIsCCqumbkUl2.6UQcetFz5QJxqj1k5Gi/4qPf9pTWsaq',
        refreshToken: null,
        firstName: 'HR',
        lastName: 'HR',
        patronymic: 'HR',
        language: 'RU',
        email: '',
        phone: '+79999999999',
        lastVisit: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 5,
        login: 'MANAGER',
        passwordHash:
          '$2b$05$m599jM38aIsCCqumbkUl2.6UQcetFz5QJxqj1k5Gi/4qPf9pTWsaq',
        refreshToken: null,
        firstName: 'MANAGER',
        lastName: 'MANAGER',
        patronymic: 'MANAGER',
        language: 'RU',
        email: '',
        phone: '+79999999999',
        lastVisit: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete('User', null, {});
  },
};
