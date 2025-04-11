import Referral from "../models/postgresql/Referral.js";



/**
 * Create a new referral
 */
export const createReferral = async (data) => {
  const { referred_by, action, points } = data;

  if (!referred_by) throw new Error("Referrer ID is required");
  if (!action) throw new Error("Action is required");

  return await Referral.create({
    referred_by,
    action,
    points: points || 0,
  });
};

/**
 * Get all referrals
 */
export const getAllReferrals = async () => {
  return await Referral.findAll();
};

/**
 * Get a referral by ID
 */
export const getReferralById = async (referral_id) => {
  const referral = await Referral.findByPk(referral_id);
  if (!referral) throw new Error("Referral not found");
  return referral;
};

/**
 * Update a referral
 */
export const updateReferral = async (referral_id, data) => {
  const referral = await Referral.findByPk(referral_id);
  if (!referral) throw new Error("Referral not found");

  await referral.update(data);
  return referral;
};

/**
 * Delete a referral
 */
export const deleteReferral = async (referral_id) => {
  const referral = await Referral.findByPk(referral_id);
  if (!referral) throw new Error("Referral not found");

  await referral.destroy();
  return { message: "Referral deleted successfully" };
};
