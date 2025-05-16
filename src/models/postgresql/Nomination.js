import { DataTypes } from "sequelize";
import { sequelize } from "../../config/database.js";
import User from "../postgresql/User.js";

const Nomination = sequelize.define("Nomination", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.UUID,
    references: { model: User, key: "id" },
  },
  category_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  sub_category: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  competitive_category_type: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  individual_or_organization: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isEmail: true,
    },
  },
  linkedin_profile: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  upload_document_or_image: {
    type: DataTypes.STRING, // file path or URL
    allowNull: true,
  },
  achievements: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: "pending",
  },
});

export default Nomination;
