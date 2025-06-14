'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('NominationForms', {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    user_id: {
      type: Sequelize.UUID,
      allowNull: true,
      references: {
        model: 'Users', // ✅ Ensure this matches your actual table name
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    category: {
      type: Sequelize.STRING,
      allowNull: true,
      comment: 'Nominated Category',
    },
    subCategory: {
      type: Sequelize.STRING,
      allowNull: true,
      comment: 'Nominated Sub-Category',
    },
    aboutYourself: {
      type: Sequelize.TEXT,
      allowNull: true,
      comment: 'Tell us about yourself',
    },
    contributionImage: {
      type: Sequelize.STRING,
      allowNull: true,
      comment: 'Upload image of contribution',
    },
    achievementOrCollaboration: {
      type: Sequelize.TEXT,
      allowNull: true,
      comment: 'Achievements or Collaborations',
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
  });
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('NominationForms');
}
