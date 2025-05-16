import Referral from "../models/postgresql/Referral.js";
import User from "../models/postgresql/User.js";
import referralService from "../services/referral.service.js";



export const createReferral = async (req, res) => {
  try {
    const data = req.body;

    const result = await referralService.createReferr(data);

    return res.status(201).json({
      message: result.message,
      referral_link: result.referral_link,
      referral: result.referral, // Optional: include created referral record
    });
  } catch (error) {
    console.error("Error creating referral:", error);
    return res.status(400).json({ message: error.message || "Referral creation failed" });
  }
};


// Get All Referrals
export const getAllReferrals = async (req, res) => {
  try {
    const referrals = await Referral.findAll({
      include: {
        model: User,
        as: "referrer",
        attributes: ["name"]
      }
    });

    return res.status(200).json(referrals);
  } catch (error) {
    console.error("Error fetching referrals:", error);
    return res.status(500).json({ message: "Failed to fetch referrals", error: error.message });
  }
};

// Get Referral By ID
export const getReferralById = async (req, res) => {
  try {
    const { id } = req.params;

    const referral = await Referral.findOne({
      where: { referral_id: id },
      include: {
        model: User,
        as: "referrer",
        attributes: ["name"]
      }
    });

    if (!referral) {
      return res.status(404).json({ message: "Referral not found" });
    }

    return res.status(200).json(referral);
  } catch (error) {
    console.error("Error getting referral:", error);
    return res.status(500).json({ message: "Failed to get referral", error: error.message });
  }
};

// Update Referral
export const updateReferral = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const referral = await Referral.findOne({ where: { referral_id: id } });

    if (!referral) {
      return res.status(404).json({ message: "Referral not found" });
    }

    await referral.update(updateData);
    return res.status(200).json(referral);
  } catch (error) {
    console.error("Error updating referral:", error);
    return res.status(500).json({ message: "Failed to update referral", error: error.message });
  }
};

// Delete Referral
export const deleteReferral = async (req, res) => {
  try {
    const { id } = req.params;

    const referral = await Referral.findOne({ where: { referral_id: id } });

    if (!referral) {
      return res.status(404).json({ message: "Referral not found" });
    }

    await referral.destroy();
    return res.status(200).json({ message: "Referral deleted successfully" });
  } catch (error) {
    console.error("Error deleting referral:", error);
    return res.status(500).json({ message: "Failed to delete referral", error: error.message });
  }
};
