import { DataTypes } from "sequelize";
import { sequelize } from "../../config/database.js";

const Judge = sequelize.define("Judge", {
  id: { 
    type: DataTypes.UUID, 
    defaultValue: DataTypes.UUIDV4, 
    primaryKey: true 
  },
  full_name: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },
  current_role: { 
    type: DataTypes.JSON 
  },
  linkedin_profile: { 
    type: DataTypes.JSON 
  },
  email: { 
    type: DataTypes.STRING, 
    allowNull: false, 
    unique: true 
  },
  country_of_resident: { 
    type: DataTypes.JSON 
  },
  reason_of_nomination: { 
    type: DataTypes.JSON 
  },
  upload_document_or_image: {
    type: DataTypes.STRING, // stores file path or URL
    allowNull: true,
  },
}, {
  tableName: "judges", // you can add this if you want a custom table name
  timestamps: true // if you want createdAt and updatedAt automatically
});

export default Judge;
