import Judge from "../models/postgresql/Judge.js";

/**
 * Create a new judge
 */
export const createJudge = async (data) => {
  try {
    // Basic validation
    if (!data.name || !data.email) {
      throw new Error("Name and email are required");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      throw new Error("Invalid email format");
    }

    // Check for duplicate email
    const existingJudge = await Judge.findOne({ where: { email: data.email } });
    if (existingJudge) {
      throw new Error("A judge with this email already exists");
    }

    // Create judge
    const judge = await Judge.create(data);

    console.log("judge:", judge);
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
