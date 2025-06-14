import { Role } from "../models/index.js"; // Import from centralized model file

export const seedRoles = async () => {
  const roles = [
    { name: "Admin", description: "Full access to manage the platform" },
    { name: "General User", description: "Standard access to platform features" },
    { name: "Sponsor", description: "Access to sponsor features and insights" },
    { name: "Nominee", description: "Access to nomination features and profile" },
  ];

  for (const role of roles) {
    await Role.findOrCreate({ where: { name: role.name }, defaults: role });
  }

  console.log("✅ Roles seeded successfully.");
};
