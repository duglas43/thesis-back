"use strict";

// {"id":"2","subjectId":"1","modality":"1","action":"manage","condition":null,"reason":null,"createdAt":"2024-03-24 12:39:46","updatedAt":"2024-03-24 12:39:46"},
// {"id":"3","subjectId":"2","modality":"1","action":"manage","condition":null,"reason":null,"createdAt":"2024-03-24 12:39:46","updatedAt":"2024-03-24 12:39:46"},
// {"id":"4","subjectId":"1","modality":"1","action":"manage","condition":"{\"id\":\"${id}\"}","reason":null,"createdAt":"2024-03-24 21:00:22","updatedAt":"2024-03-24 21:02:15"},
// {"id":"5","subjectId":"1","modality":"1","action":"read","condition":null,"reason":null,"createdAt":"2024-03-24 21:02:51","updatedAt":"2024-03-24 21:02:51"},
// {"id":"6","subjectId":"3","modality":"1","action":"manage","condition":null,"reason":null,"createdAt":"2024-03-24 21:03:21","updatedAt":"2024-03-24 21:03:33"},
// {"id":"7","subjectId":"2","modality":"1","action":"manage","condition":null,"reason":null,"createdAt":"2024-03-24 21:03:34","updatedAt":"2024-03-24 21:03:41"},
// {"id":"8","subjectId":"4","modality":"1","action":"manage","condition":null,"reason":null,"createdAt":"2024-03-24 21:03:42","updatedAt":"2024-03-24 21:03:53"},
// {"id":"9","subjectId":"5","modality":"1","action":"manage","condition":null,"reason":null,"createdAt":"2024-03-24 21:03:54","updatedAt":"2024-03-24 21:04:02"},
// {"id":"10","subjectId":"6","modality":"1","action":"read","condition":null,"reason":null,"createdAt":"2024-03-24 21:04:04","updatedAt":"2024-03-24 21:04:08"},
// {"id":"11","subjectId":"17","modality":"1","action":"read","condition":"{\"name\":{\"$in\":[\"Users\",\"Machines\",\"Details\",\"Profile\"]}}","reason":null,"createdAt":"2024-03-24 21:04:10","updatedAt":"2024-03-24 21:08:26"}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Permission", [
      {
        id: 1,
        modality: true,
        action: "manage",
        subjectId: 18,
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
