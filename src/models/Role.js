import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Role = sequelize.define("Role", {

  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false, unique: true },
  description: { type: DataTypes.STRING }
  
});

export default Role;
