const User = require("../models/user");
const jwt = require("jsonwebtoken");
const config = require("../config/config");


const blacklistedTokens = [];
const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    console.log("here",req.body)
    const existingUser = await User.findByEmail(email);
    console.log("existingUser", existingUser);
    if (existingUser) {
      return res.status(400).json({ error: "Email already in use" });
    }

    // Create new user
    await User.create({ name, email, password });
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findByEmail(email);
    if (!user)
      return res.status(401).json({ error: "Invalid email or password" });

    // Compare passwords
    const isMatch = await User.comparePassword(password, user.password);
    if (!isMatch)
      return res.status(401).json({ error: "Invalid email or password" });

    // Generate JWT token
    const token = jwt.sign(
      { email: user.email, name: user.name },
      config.jwtSecret,
      { expiresIn: "1h" }
    );
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const logout = (req, res) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Extract token from headers

  if (!token) {
    return res.status(400).json({ message: "Token required" });
  }

  // Add token to blacklist
  blacklistedTokens.push(token); 

  res.status(200).json({ message: "Logged out successfully" });
};

module.exports = {
  register,
  login,
  logout,
};
