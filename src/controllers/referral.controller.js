import * as ReferralService from "../services/referral.service.js";



export const createReferral = async (req, res) => {
  try {
    const referral = await ReferralService.createReferral(req.body);
    res.status(201).json(referral);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



export const getAllReferrals = async (req, res) => {
  try {
    const referrals = await ReferralService.getAllReferrals();
    res.json(referrals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const getReferralById = async (req, res) => {
  try {
    const referral = await ReferralService.getReferralById(req.params.id);
    res.json(referral);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};



export const updateReferral = async (req, res) => {
  try {
    const updated = await ReferralService.updateReferral(req.params.id, req.body);
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



export const deleteReferral = async (req, res) => {
  try {
    const result = await ReferralService.deleteReferral(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
