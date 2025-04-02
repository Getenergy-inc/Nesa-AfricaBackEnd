import { signupUser, loginUser } from "../services/auth.service.js";



export const signup = async (req, res) => {

  try {

    const userData = req.body;
    const response = await signupUser(userData);
    res.status(response.status).json(response);

  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }

};


export const login = async (req, res) => {
    try {
      const loginData = req.body;
      const response = await loginUser(loginData);
      res.status(response.status).json(response);
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error: error.message });
    }
  };
  
