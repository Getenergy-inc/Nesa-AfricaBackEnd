import { DataTypes } from "sequelize";
import { sequelize } from "../../config/database.js";

const Ambassador = sequelize.define("Ambassador", {
  ambassador_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  ageRange: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  phoneNo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false
  },
  socials: {
    type: DataTypes.JSON,
    allowNull: true  // Example: { instagram: "", twitter: "", linkedin: "" }
  }
});

export default Ambassador;
