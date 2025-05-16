import Ambassador from "../models/postgresql/Ambassador.js";

/**
 * Create new Ambassador
 */
export const createAmbassador = async (data) => {
  return await Ambassador.create(data);
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
