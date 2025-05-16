import Referral from "../models/postgresql/Referral.js";
import generateReferralLink from "../middleware/referralMiddleware.js"


// Create a new referral
const createReferr = async (data) => {
  // Middleware already creates and saves to DB
  const result = await generateReferralLink(data);
  const database = await Referral.create(data);
  return result;
};


// Get all referrals
const getAllReferrals = async () => {
  return await Referral.findAll();
};

// Get a referral by ID
const getReferralById = async (referral_id) => {
  const referral = await Referral.findByPk(referral_id);
  if (!referral) throw new Error("Referral not found");
  return referral;
};

// Update a referral
const updateReferral = async (referral_id, data) => {
  const referral = await Referral.findByPk(referral_id);
  if (!referral) throw new Error("Referral not found");

  await referral.update(data);
  return referral;
};

// Delete a referral
const deleteReferral = async (referral_id) => {
  const referral = await Referral.findByPk(referral_id);
  if (!referral) throw new Error("Referral not found");

  await referral.destroy();
  return { message: "Referral deleted successfully" };
};

// Export all functions as default
export default {
  createReferr,
  getAllReferrals,
  getReferralById,
  updateReferral,
  deleteReferral,
};
