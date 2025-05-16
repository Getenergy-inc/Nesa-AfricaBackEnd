import Applicant from "../models/postgresql/Applicant.js";

export const createApplicant = async (data) => {
  return await Applicant.create(data);
};

export const getAllApplicants = async () => {
  return await Applicant.findAll();
};

export const getApplicantById = async (id) => {
  return await Applicant.findByPk(id);
};

export const updateApplicant = async (id, data) => {
  const applicant = await Applicant.findByPk(id);
  if (!applicant) throw new Error("Applicant not found");
  return await applicant.update(data);
};

export const deleteApplicant = async (id) => {
  const applicant = await Applicant.findByPk(id);
  if (!applicant) throw new Error("Applicant not found");
  await applicant.destroy();
  return { message: "Judge application deleted successfully" };
};
