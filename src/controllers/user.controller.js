import { getUserById } from "../services/user.service.js";




export const getUserProfile = async (req, res) => {

  try {
    const user = await getUserById(req.user.id); // Fetch user data
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User profile retrieved", user });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving user profile", error: error.message });
  }

};
