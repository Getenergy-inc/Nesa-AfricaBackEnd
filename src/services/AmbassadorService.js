import Ambassador from "../models/postgresql/Ambassador.js";

/**
 * Create new Ambassador
 */
export const createAmbassador = async (data) => {
  try {
    // Validate required fields
    if (!data.full_name || !data.email) {
      throw new Error("Full name and email are required.");
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      throw new Error("Invalid email format.");
    }

    // Check for duplicate email
    const existingAmbassador = await Ambassador.findOne({ where: { email: data.email } });
    if (existingAmbassador) {
      throw new Error("An ambassador with this email already exists.");
    }

    // Create ambassador
    const ambassador = await Ambassador.create(data);
    return ambassador;

  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      throw new Error("Email must be unique.");
    }
    throw new Error(error.message || "Error creating ambassador.");
  }
};

/**
 * Get all Ambassadors
 */
export const getAllAmbassadors = async () => {
  return await Ambassador.findAll();
};

/**
 * Get Ambassador by ID
 */
export const getAmbassadorById = async (id) => {
  const ambassador = await Ambassador.findByPk(id);
  if (!ambassador) {
    throw new Error("Ambassador not found");
  }
  return ambassador;
};

/**
 * Update Ambassador
 */
export const updateAmbassador = async (id, data) => {
  const ambassador = await Ambassador.findByPk(id);
  if (!ambassador) {
    throw new Error("Ambassador not found");
  }

  await ambassador.update(data);
  return ambassador;
};

/**
 * Delete Ambassador
 */
export const deleteAmbassador = async (id) => {
  const ambassador = await Ambassador.findByPk(id);
  if (!ambassador) {
    throw new Error("Ambassador not found");
  }

  await ambassador.destroy();
  return { message: "Ambassador deleted successfully" };
};
