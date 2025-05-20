import { DataTypes } from "sequelize";
import { sequelize } from "../../config/database.js";
import User from "./User.js"; 

const Nomination = sequelize.define("Nomination", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.UUID,
    allowNull: false,
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
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
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
