import { DataTypes } from "sequelize";
import { sequelize } from "../../config/database.js";
import Judge from "./Judge.js";

const Applicant = sequelize.define("Applicant", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  full_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  experience: {
    type: DataTypes.TEXT
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  upload_document: {
    type: DataTypes.STRING
  },
  phone_number: {
    type: DataTypes.STRING
  },
  state_and_region: {
    type: DataTypes.STRING
  },
  motivation_statement: {
    type: DataTypes.TEXT
  },
  status: {
    type: DataTypes.ENUM("pending", "accepted", "denied"),
    defaultValue: "pending",
    allowNull: false,
  },
  token: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  judge_id: { // ✅ Foreign key mapping to Applicant
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: "Judge", // Table name for Judge
      key: "id"
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
  },
  education_background: {
    type: DataTypes.TEXT
  },
  upload_profile_image: {
    type: DataTypes.STRING
  }
}, {
  tableName: "applicants",
  timestamps: true
});

export default Applicant;
