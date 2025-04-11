import Membership from "../models/postgresql/Membership.js";


/**
 * Create a new membership
 */
export const createMembership = async (data) => {
  const { user_id, level, chapter_link, dues, ambassador_tier } = data;

  if (!user_id) throw new Error("User ID is required");
  if (!level) throw new Error("Membership level is required");

  return await Membership.create({
    user_id,
    level,
    chapter_link,
    dues,
    ambassador_tier,
  });
};

/**
 * Get all memberships
 */
export const getAllMemberships = async () => {
  return await Membership.findAll();
};

/**
 * Get a membership by ID
 */
export const getMembershipById = async (id) => {
  const membership = await Membership.findByPk(id);
  if (!membership) throw new Error("Membership not found");
  return membership;
};

/**
 * Update a membership by ID
 */
export const updateMembership = async (id, data) => {
  const membership = await Membership.findByPk(id);
  if (!membership) throw new Error("Membership not found");

  await membership.update(data);
  return membership;
};

/**
 * Delete a membership by ID
 */
export const deleteMembership = async (id) => {
  const membership = await Membership.findByPk(id);
  if (!membership) throw new Error("Membership not found");

  await membership.destroy();
  return { message: "Membership deleted successfully" };
};
