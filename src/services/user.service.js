import User from "../models/postgresql/User.js";



/**
 * Get user profile by ID
 * @param {string} userId - The ID of the user
 * @returns {Promise<Object>} - Returns the user object without password
 */
export const getUserById = async (userId) => {
  try {
    const user = await User.findByPk(userId, {
      attributes: { exclude: ["password"] }, // Exclude password from response
    });

    return user;
  } catch (error) {
    throw new Error("Error fetching user profile");
  }
};
