'use strict';

export async function up(queryInterface, Sequelize) {
  // Remove the existing foreign key constraint
  await queryInterface.removeConstraint('Wallets', 'Wallets_user_id_fkey');

  // Add the foreign key constraint with ON DELETE CASCADE
  await queryInterface.addConstraint('Wallets', {
    fields: ['user_id'],
    type: 'foreign key',
    name: 'Wallets_user_id_fkey', // same name to replace
    references: {
      table: 'Users',
      field: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });
}
export async function down(queryInterface, Sequelize) {
  // Revert back: remove the cascade constraint
  await queryInterface.removeConstraint('Wallets', 'Wallets_user_id_fkey');

  // Re-add original constraint (without cascade)
  await queryInterface.addConstraint('Wallets', {
    fields: ['user_id'],
    type: 'foreign key',
    name: 'Wallets_user_id_fkey',
    references: {
      table: 'Users',
      field: 'id',
    },
    onDelete: 'NO ACTION',
    onUpdate: 'CASCADE',
  });
}
