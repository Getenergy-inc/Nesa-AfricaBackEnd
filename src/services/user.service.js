import User from "../models/postgresql/User.js";

/**
 * Get all users (excluding passwords)
 * @returns {Promise<Array>} - List of users
 */
export const getAllUsers = async () => {
  try {
    return await User.findAll({
      attributes: { exclude: ["password"] },
    });
  } catch (error) {
    throw new Error("Error fetching users: " + error.message);
  }
};

/**
 * Get user by ID
 * @param {string} userId - The ID of the user
 * @returns {Promise<Object>} - Returns user object without password
 */
export const getUserById = async (userId) => {
  try {
    return await User.findByPk(userId, {
      attributes: { exclude: ["password"] },
    });
  } catch (error) {
    throw new Error("Error fetching user profile: " + error.message);
  }
};

/**
 * Update user details
 * @param {string} userId - The ID of the user
 * @param {Object} updateData - Data to update (name, email, etc.)
 * @returns {Promise<Object>} - Updated user object
 */
export const updateUser = async (userId, updateData) => {
  try {
    const user = await User.findByPk(userId);
    if (!user) throw new Error("User not found");

    await user.update(updateData);
    return user;
  } catch (error) {
    throw new Error("Error updating user: " + error.message);
  }
};

/**
 * Delete user by ID
 * @param {string} userId - The ID of the user
 * @returns {Promise<string>} - Deletion success message
 */
export const deleteUser = async (userId) => {
  try {
    const user = await User.findByPk(userId);
    if (!user) throw new Error("User not found");

    await user.destroy();
    return "User deleted successfully";
  } catch (error) {
    throw new Error("Error deleting user: " + error.message);
  }
};
