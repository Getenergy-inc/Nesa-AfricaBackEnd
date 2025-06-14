'use strict';

/** @type {import('sequelize-cli').Migration} */

export async function up(queryInterface, Sequelize) {
  // First, remove the existing foreign key constraint
  await queryInterface.removeConstraint('wallets', 'wallets_user_id_fkey');

  // Then, add the foreign key again with ON DELETE CASCADE
  await queryInterface.addConstraint('wallets', {
    fields: ['user_id'],
    type: 'foreign key',
    name: 'wallets_user_id_fkey', // Keep the name consistent
    references: {
      table: 'Users',
      field: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });

}
export async function down(queryInterface, Sequelize) {
  // Rollback: remove cascade constraint and re-add without cascade
  await queryInterface.removeConstraint('wallets', 'wallets_user_id_fkey');

  await queryInterface.addConstraint('wallets', {
    fields: ['user_id'],
    type: 'foreign key',
    name: 'wallets_user_id_fkey',
    references: {
      table: 'Users',
      field: 'id',
    },
    onDelete: 'NO ACTION',
    onUpdate: 'CASCADE',
  });

}
