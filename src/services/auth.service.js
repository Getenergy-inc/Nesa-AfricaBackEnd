import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/postgresql/User.js";
import Role from "../models/Role.js";




export const signupUser = async ({ name, email, password, role }) => {

  try {
    // Validate role
    const existingRole = await Role.findOne({ where: { name: role } });
    if (!existingRole) {
      return { status: 400, message: "Invalid role selected" };
    }

    // Check if user exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return { status: 400, message: "Email is already registered" };
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: existingRole.name, // Store role as a string
    });

    // Generate JWT token
    const token = jwt.sign(
      { id: newUser.id, email: newUser.email, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return {
      status: 201,
      message: "User registered successfully",
      user: { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role },
      token,
    };

  } catch (error) {
    return { status: 500, message: "Error creating user", error: error.message };
  }


};



// login Service logic




export const loginUser = async ({ email, password }) => {


    try {
      // Check if user exists
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return { status: 400, message: "Invalid email or password" };
      }
  
      // Compare password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return { status: 400, message: "Invalid email or password" };
      }
  
      // Generate JWT token
      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );
  
      return {
        status: 200,
        message: "Login successful",
        user: { id: user.id, name: user.name, email: user.email, role: user.role },
        token,
      };
  
    } catch (error) {
      return { status: 500, message: "Error logging in", error: error.message };
    }


  };
  
