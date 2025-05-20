'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('judges', 'country', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn('judges', 'reason', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn('judges', 'document', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('judges', 'country');
    await queryInterface.removeColumn('judges', 'reason');
    await queryInterface.removeColumn('judges', 'document');
  }
};
