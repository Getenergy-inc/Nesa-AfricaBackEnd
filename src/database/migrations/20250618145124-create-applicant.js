'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('applicants', {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: Sequelize.literal('uuid_generate_v4()')
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
      type: Sequelize.ENUM("pending", "accepted", "denied", "approved"),
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
        model: 'judges',
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
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
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
  });
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('applicants');
  await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_applicants_status";');
}
