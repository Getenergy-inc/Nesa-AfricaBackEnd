import Judge from "../models/postgresql/Judge.js";

/**
 * Create a new judge
 */
export const createJudge = async (data) => {
  const { 
    full_name, 
    current_role, 
    linkedin_profile, 
    email, 
    country, 
    reason, 
    document 
  } = data;

  console.log(data)

  if (!full_name || !email) {
    throw new Error("Full name and Email are required");
  }

  try {
    const judge = await Judge.create(data);

    console.log("judge :" + judge)

    return judge;
  } catch (error) {
    throw new Error(error.message || "Error creating judge");
  }
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
