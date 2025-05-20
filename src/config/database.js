// db/config/database.js or wherever you're managing this
import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config(); // Load env vars from .env

const isProduction = process.env.NODE_ENV === "production";

console.log("ENV", process.env.NODE_ENV);
console.log("Using SSL?", isProduction);
console.log("DB URL", process.env.POSTGRES_URI);

const databaseUrl = process.env.POSTGRES_URI;

if (!databaseUrl) {
  throw new Error("❌ POSTGRES_URI is not defined in the .env file.");
}

// Create Sequelize instance
export const sequelize = new Sequelize(databaseUrl, {
  dialect: "postgres",
  logging: false,
  dialectOptions: isProduction ? {
    ssl: {
      require: true, // Supabase requires SSL
      rejectUnauthorized: false // Allow self-signed certs
    }
  } : {},
  dialectModuleOptions: {
    family: 4 // 👈 Force IPv4 to prevent ENETUNREACH via IPv6
  }
});

// Connect and sync
export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ PostgreSQL connected successfully.");

    const { Role } = await import("../models/index.js");

    await sequelize.sync({ alter: true });
    console.log("✅ Tables synced.");

    const { seedRoles } = await import("../seeds/seedRoles.js");
    await seedRoles();

  } catch (error) {
    console.error("❌ Database connection error:", error);
  }
};
