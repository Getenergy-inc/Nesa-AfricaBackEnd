import * as DonationService from "../services/donation.service.js";

export const createDonation = async (req, res) => {
  try {
    const donation = await DonationService.createDonation(req.body);
    res.status(201).json(donation);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAllDonations = async (req, res) => {
  try {
    const donations = await DonationService.getAllDonations();
    res.status(200).json(donations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getDonationById = async (req, res) => {
  try {
    const donation = await DonationService.getDonationById(req.params.id);
    res.status(200).json(donation);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

export const updateDonation = async (req, res) => {
  try {
    const updated = await DonationService.updateDonation(req.params.id, req.body);
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteDonation = async (req, res) => {
  try {
    const result = await DonationService.deleteDonation(req.params.id);
    res.status(200).json(result);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};
