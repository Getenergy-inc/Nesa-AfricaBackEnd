'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Add "name" column
    await queryInterface.addColumn("Nominations", "name", {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "Unnamed Nominee"
    });

    // Add "email" column
    await queryInterface.addColumn("Nominations", "email", {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "nominee@example.com"
    });
  },

  async down(queryInterface, Sequelize) {
    // Remove "name" and "email" columns
    await queryInterface.removeColumn("Nominations", "name");
    await queryInterface.removeColumn("Nominations", "email");
  }
};
