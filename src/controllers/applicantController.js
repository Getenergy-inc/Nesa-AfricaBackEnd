import * as applicantService from "../services/applicantService.js";

export const create = async (req, res) => {
  try {
    const applicant = await applicantService.createApplicant(req.body);
    res.status(201).json({ status: "success", applicant });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

export const findAll = async (req, res) => {
  const applicants = await applicantService.getAllApplicants();
  res.json({ status: "success", applicants });
};

export const findOne = async (req, res) => {
  const applicant = await applicantService.getApplicantById(req.params.id);
  if (!applicant) {
    return res.status(404).json({ status: "error", message: "Not found" });
  }
  res.json({ status: "success", applicant });
};

export const update = async (req, res) => {
  try {
    const updated = await applicantService.updateApplicant(req.params.id, req.body);
    res.json({ status: "success", updated });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

export const remove = async (req, res) => {
  try {
    await applicantService.deleteApplicant(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};
