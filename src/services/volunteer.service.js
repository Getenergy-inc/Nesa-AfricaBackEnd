import Volunteer from "../models/postgresql/Volunteer.js";



/**
 * Create a new volunteer
 */
export const createVolunteer = async (data) => {
  const { location, role, milestone_log } = data;

  if (!location) throw new Error("Location is required");
  if (!role) throw new Error("Role is required");

  return await Volunteer.create({ location, role, milestone_log });
};

/**
 * Get all volunteers
 */
export const getAllVolunteers = async () => {
  return await Volunteer.findAll();
};

/**
 * Get volunteer by ID
 */
export const getVolunteerById = async (volunteer_id) => {
  const volunteer = await Volunteer.findByPk(volunteer_id);
  if (!volunteer) throw new Error("Volunteer not found");
  return volunteer;
};

/**
 * Update a volunteer
 */
export const updateVolunteer = async (volunteer_id, data) => {
  const volunteer = await Volunteer.findByPk(volunteer_id);
  if (!volunteer) throw new Error("Volunteer not found");

  await volunteer.update(data);
  return volunteer;
};

/**
 * Delete a volunteer
 */
export const deleteVolunteer = async (volunteer_id) => {
  const volunteer = await Volunteer.findByPk(volunteer_id);
  if (!volunteer) throw new Error("Volunteer not found");

  await volunteer.destroy();
  return { message: "Volunteer deleted successfully" };
};
