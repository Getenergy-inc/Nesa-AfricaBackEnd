import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const isProduction = process.env.NODE_ENV === "production";
const databaseUrl = process.env.POSTGRES_URI;

if (!databaseUrl) {
  throw new Error("❌ POSTGRES_URI is not defined in the .env file.");
}

console.log("ENV:", process.env.NODE_ENV);
console.log("Using SSL?", isProduction);
console.log("DB URL:", databaseUrl);

const sequelize = new Sequelize(databaseUrl, {
  dialect: "postgres",
  logging: false,
  dialectOptions: isProduction
    ? {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      }
    : {},
});

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

export { sequelize };
