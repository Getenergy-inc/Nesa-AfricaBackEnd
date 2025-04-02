import { Role } from "../models/index.js"; // Import from centralized model file

export const seedRoles = async () => {
  const roles = [
    { name: "Super Admin", description: "Full system access" },
    { name: "Department Head", description: "Manage department data" },
    { name: "Judge", description: "Access to scoring panel" },
    { name: "Ambassador", description: "Regional data & events" },
    { name: "Visitor", description: "Basic CMS access, voting" },
    { name: "Volunteer", description: "Community tasks & dashboards" },
  ];

  for (const role of roles) {
    await Role.findOrCreate({ where: { name: role.name }, defaults: role });
  }

  console.log("✅ Roles seeded successfully.");
};
