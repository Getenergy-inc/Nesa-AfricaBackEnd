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
    allowNull: true
  },
  age_range: {
    type: DataTypes.STRING,
    allowNull: true
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
    allowNull: true
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true
  },
  country: {
    type: DataTypes.STRING,
    allowNull: true
  },
  socials: {
    type: DataTypes.STRING,
    allowNull: true  
  }
});

export default Ambassador;
