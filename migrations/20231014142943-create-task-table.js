'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.createTable('tasks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
          type: Sequelize.STRING,
          allowNull: false,
      },
      creationDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      dueDate: {
          type: Sequelize.STRING,
          allowNull: false,
      },
      assignedTo: {
          type: Sequelize.STRING,
          allowNull: false,
      },
      category: {
          type: Sequelize.STRING,
          allowNull: false,
      },
      status: {
          type: Sequelize.STRING,
          allowNull: false,
      },
      
    });
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.dropTable('tasks');
  }
};
