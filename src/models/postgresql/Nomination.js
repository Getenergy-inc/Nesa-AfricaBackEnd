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
  competitive_type: {
    type: DataTypes.STRING,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: "pending",
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
  organization: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  social_media: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  document: {
    type: DataTypes.STRING, // store file path or URL
    allowNull: true,
  },
  achievements: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

export default Nomination;
