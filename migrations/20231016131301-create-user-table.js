'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.createTable('users',  {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      password: {
          type: Sequelize.STRING,
          allowNull: false,
      },
      
    });
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.dropTable('users');
  }
};
