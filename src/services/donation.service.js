import Donation from "../models/postgresql/Donation.js";

/**
 * Create a new donation
 */
export const createDonation = async (data) => {
  const { donor_id, amount, channel, allocated_to } = data;

  if (!donor_id || !amount || !channel) {
    throw new Error("Missing required fields: donor_id, amount, or channel");
  }

  return await Donation.create({ donor_id, amount, channel, allocated_to });
};

/**
 * Get all donations
 */
export const getAllDonations = async () => {
  return await Donation.findAll();
};

/**
 * Get a donation by ID
 */
export const getDonationById = async (id) => {
  const donation = await Donation.findByPk(id);
  if (!donation) throw new Error("Donation not found");
  return donation;
};

/**
 * Update a donation
 */
export const updateDonation = async (id, data) => {
  const donation = await Donation.findByPk(id);
  if (!donation) throw new Error("Donation not found");

  await donation.update(data);
  return donation;
};

/**
 * Delete a donation
 */
export const deleteDonation = async (id) => {
  const donation = await Donation.findByPk(id);
  if (!donation) throw new Error("Donation not found");

  await donation.destroy();
  return { message: "Donation deleted successfully" };
};
