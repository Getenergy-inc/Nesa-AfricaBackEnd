import { DataTypes } from "sequelize";
import {sequelize} from "../../config/database.js";

const Ambassador = sequelize.define("Ambassador", {

  ambassador_id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  region: { type: DataTypes.STRING, allowNull: false },
  type: { type: DataTypes.ENUM("project", "senior"), allowNull: false },
  assigned_KPIs: { type: DataTypes.JSON },
  
});

export default Ambassador;
