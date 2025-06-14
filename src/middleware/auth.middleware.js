import jwt from "jsonwebtoken";
import User from "../models/postgresql/User.js"; // Adjust path if needed

export const authenticate = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await User.findByPk(req.user.id);
    if (!user || user.role !== "Admin") {
      return res.status(403).json({ message: "Access denied. Super Admin only." });
    }

    req.user = user; // optional, if you want to use full user details later
    next();
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};
