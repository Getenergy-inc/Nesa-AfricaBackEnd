import Judge from "../models/postgresql/Judge.js";

/**
 * Create a new judge
 */
export const createJudge = async (data) => {
  const { application_id, assigned_categories, logs, current_status } = data;

  if (!application_id) {
    throw new Error("Application ID is required");
  }

  return await Judge.create({
    application_id,
    assigned_categories,
    logs,
    current_status,
  });
};

/**
 * Get all judges
 */
export const getAllJudges = async () => {
  return await Judge.findAll();
};

/**
 * Get a judge by ID
 */
export const getJudgeById = async (id) => {
  const judge = await Judge.findByPk(id);
  if (!judge) throw new Error("Judge not found");
  return judge;
};

/**
 * Update a judge by ID
 */
export const updateJudge = async (id, data) => {
  const judge = await Judge.findByPk(id);
  if (!judge) throw new Error("Judge not found");

  await judge.update(data);
  return judge;
};

/**
 * Delete a judge
 */
export const deleteJudge = async (id) => {
  const judge = await Judge.findByPk(id);
  if (!judge) throw new Error("Judge not found");

  await judge.destroy();
  return { message: "Judge deleted successfully" };
};
