import { DataTypes } from "sequelize";
import { sequelize } from "../../config/database.js";
import User from "./User.js";  // Import User model for the reference

// Points dictionary (as JSON object)
const referralPoints = {
  "facebook": 5,
  "linkedin": 4,
  "instagram": 6,
  "twitter": 7,
  "telegram": 4,
  "tiktok": 6,
};

const Referral = sequelize.define("Referral", {
  
  referral_id: {  // Renamed field as requested
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  referred_by: {  // Changed field name to referred_by
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: User,
      key: "id",  // Foreign key pointing to the User model
    },
    onDelete: "CASCADE",
  },
  referral_code: {  // Added referral_code field
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  referral_source: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  action: {  // Added action field for tracking the referral action
    type: DataTypes.STRING,
    allowNull: false,
  },
  points: {  // Points earned for the referral
    type: DataTypes.INTEGER,
    defaultValue: 0,
    // Getter for points based on the referral source
    get() {
      const referralSource = this.getDataValue("referral_source");
      return referralPoints[referralSource.toLowerCase()] || 0;  // Returns points based on source or 0 if not found
    },
  },
  status: {  // Added status field to track the referral's status
    type: DataTypes.STRING,
    defaultValue: "pending",
  },
  timestamp: {  // Timestamp for the referral action
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: "referrals",
  timestamps: true,  // adds createdAt and updatedAt
});

export default Referral;
