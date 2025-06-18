'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('applicants', {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.fn('uuid_generate_v4'),
      primaryKey: true
    },
    full_name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    experience: {
      type: Sequelize.TEXT
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    upload_document: {
      type: Sequelize.STRING
    },
    phone_number: {
      type: Sequelize.STRING
    },
    state_and_region: {
      type: Sequelize.STRING
    },
    motivation_statement: {
      type: Sequelize.TEXT
    },
    status: {
      type: Sequelize.ENUM("pending", "accepted", "denied"),
      allowNull: false,
      defaultValue: "pending"
    },
    token: {
      type: Sequelize.STRING,
      allowNull: true
    },
    judge_id: {
      type: Sequelize.UUID,
      allowNull: true,
      references: {
        model: "judges", // Must match tableName in Judge model
        key: "id"
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE"
    },
    education_background: {
      type: Sequelize.TEXT
    },
    upload_profile_image: {
      type: Sequelize.STRING
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.fn('NOW')
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.fn('NOW')
    }
  });
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('applicants');
}
