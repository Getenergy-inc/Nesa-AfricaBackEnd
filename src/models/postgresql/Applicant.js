import { DataTypes } from "sequelize";
import { sequelize } from "../../config/database.js";

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
