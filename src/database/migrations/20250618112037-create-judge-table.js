'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('judges', {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.literal('uuid_generate_v4()'),
      allowNull: false,
      primaryKey: true,
    },
    full_name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    current_role: {
      type: Sequelize.STRING
    },
    linkedin_profile: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    country: {
      type: Sequelize.STRING
    },
    reason: {
      type: Sequelize.STRING
    },
    document: {
      type: Sequelize.STRING,
      allowNull: true
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal('NOW()')
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal('NOW()')
    }
  });
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('judges');
}
