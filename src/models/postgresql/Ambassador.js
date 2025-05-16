import { DataTypes } from "sequelize";
import { sequelize } from "../../config/database.js";

const Ambassador = sequelize.define("Ambassador", {
  ambassador_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  full_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  age_range: {
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
  phone_number: {
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
    type: DataTypes.STRING,
    allowNull: true  // Example: { instagram: "", twitter: "", linkedin: "" }
  }
});

export default Ambassador;
