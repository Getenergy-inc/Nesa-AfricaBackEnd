import { DataTypes } from "sequelize";
import { sequelize } from "../../config/database.js";
import User from "./User.js";
import NominationForm from "./NominationForm.js";

const Nomination = sequelize.define("Nomination", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: "Users",
      key: "id",
    },
    onDelete: "CASCADE",
  },
  category: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  categoryType: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  subCategory: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  linkedinProfile: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: false,
    validate: {
      isEmail: true,
    },
  },
  status: {
    type: DataTypes.ENUM("pending", "accepted"),
    defaultValue: "pending",
    allowNull: false,
  },
  token: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  nomination_id: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: "NominationForms",
      key: "id",
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
  },
  achievements: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  document: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: "Nominations",
  timestamps: true,
});

export default Nomination;
