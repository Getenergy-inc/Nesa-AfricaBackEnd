import Staff from "../models/postgresql/Staff.js";


/**
 * Create a new staff record
 */
export const createStaff = async (data) => {
  const { department, position, assigned_tasks, weekly_KPIs } = data;

  if (!department) throw new Error("Department is required");
  if (!position) throw new Error("Position is required");

  return await Staff.create({
    department,
    position,
    assigned_tasks: assigned_tasks || [],
    weekly_KPIs: weekly_KPIs || [],
  });
};

/**
 * Get all staff records
 */
export const getAllStaff = async () => {
  return await Staff.findAll();
};

/**
 * Get a staff by ID
 */
export const getStaffById = async (staff_id) => {
  const staff = await Staff.findByPk(staff_id);
  if (!staff) throw new Error("Staff not found");
  return staff;
};

/**
 * Update a staff record
 */
export const updateStaff = async (staff_id, data) => {
  const staff = await Staff.findByPk(staff_id);
  if (!staff) throw new Error("Staff not found");

  await staff.update(data);
  return staff;
};

/**
 * Delete a staff record
 */
export const deleteStaff = async (staff_id) => {
  const staff = await Staff.findByPk(staff_id);
  if (!staff) throw new Error("Staff not found");

  await staff.destroy();
  return { message: "Staff record deleted successfully" };
};
