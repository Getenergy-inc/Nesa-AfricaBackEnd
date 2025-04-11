import { getAllUsers, getUserById, updateUser, deleteUser } from "../services/user.service.js";

/**
 * Get list of all users
 */
export const getUsers = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Get a single user by ID
 */
export const getUser = async (req, res) => {
  try {
    const user = await getUserById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Update a user
 */
export const updateUserProfile = async (req, res) => {
  try {
    const updatedUser = await updateUser(req.params.id, req.body);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Delete a user
 */
export const removeUser = async (req, res) => {
  try {
    const message = await deleteUser(req.params.id);
    res.status(200).json({ message });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
