'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('Nominations', {
      fields: ['email'],
      type: 'unique',
      name: 'unique_email_constraint'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('Nominations', 'unique_email_constraint');
  }
};
