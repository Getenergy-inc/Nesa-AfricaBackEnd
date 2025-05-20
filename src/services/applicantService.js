import Applicant from "../models/postgresql/Applicant.js";

export const createApplicant = async (data) => {
  try {
    // Validate required fields
    if (!data.full_name || !data.email) {
      throw new Error("Full name and email are required.");
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      throw new Error("Invalid email format.");
    }

    // Check for duplicate email
    const existingApplicant = await Applicant.findOne({ where: { email: data.email } });
    if (existingApplicant) {
      throw new Error("An applicant with this email already exists.");
    }

    // Create applicant
    const applicant = await Applicant.create(data);
    return applicant;

  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      throw new Error("Email must be unique.");
    }
    throw new Error(error.message || "Error creating applicant.");
  }
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
