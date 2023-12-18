'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Order', [
      {
        id: 1,
        addressId: 1,
        clientId: 3,
        responsibleId: 5,
        name: 'Order 1',
        comment: 'Comment 1',
        statusCode: 0,
        totalPrice: 1000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        addressId: 1,
        clientId: 3,
        responsibleId: 5,
        name: 'Order 2',
        comment: 'Comment 2',
        statusCode: 0,
        totalPrice: 2000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Order', null, {});
  },
};
