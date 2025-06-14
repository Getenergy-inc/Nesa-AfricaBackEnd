'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("NominationForms", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.literal("uuid_generate_v4()"),
      primaryKey: true,
    },
    user_id: {
      type: Sequelize.UUID,
      references: {
        model: "Users",
        key: "id",
      },
      onDelete: "CASCADE",
      allowNull: true,
    },
    category: {
      type: Sequelize.STRING,
    },
    subCategory: {
      type: Sequelize.STRING,
    },
    aboutYourself: {
      type: Sequelize.TEXT,
    },
    contributionImage: {
      type: Sequelize.STRING,
    },
    achievementOrCollaboration: {
      type: Sequelize.TEXT,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  });
}

export async function down(queryInterface) {
  await queryInterface.dropTable("NominationForms");
}
