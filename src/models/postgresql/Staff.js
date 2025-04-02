import { DataTypes } from "sequelize";
import {sequelize} from "../../config/database.js";

const Staff = sequelize.define("Staff", {

  staff_id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  department: { type: DataTypes.STRING, allowNull: false },
  position: { type: DataTypes.STRING, allowNull: false },
  assigned_tasks: { type: DataTypes.JSON },
  weekly_KPIs: { type: DataTypes.JSON },
  
});

export default Staff;
