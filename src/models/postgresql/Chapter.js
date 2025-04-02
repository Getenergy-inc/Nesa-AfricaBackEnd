import { DataTypes } from "sequelize";
import {sequelize} from "../../config/database.js";

const Chapter = sequelize.define("Chapter", {

  chapter_id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  country: { type: DataTypes.STRING, allowNull: false },
  LCP: { type: DataTypes.STRING },
  BOA_members: { type: DataTypes.JSON },
  forum_logs: { type: DataTypes.JSON },
  performance: { type: DataTypes.STRING },
  
});

export default Chapter;
