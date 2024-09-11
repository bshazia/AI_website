const User = require("../models/user");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const redis = require("redis");
const { sendVerificationEmail , sendResetPasswordEmail} = require("../utils/emailService"); // Import the email utility
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const util = require("util");
const logger = require('../config/logger');
const validator = require('validator');







// Set up Redis client
const redisClient = redis.createClient({
  host: process.env.REDIS_HOST || "127.0.0.1", // Assuming Redis is running locally
  port: process.env.REDIS_PORT || 6379, // Default Redis port
});

redisClient.on("error", (err) => {
  console.error("Redis error: ", err);
});

// Convert Redis methods to promises
const redisGetAsync = util.promisify(redisClient.get).bind(redisClient);
const redisSetAsync = util.promisify(redisClient.set).bind(redisClient);
const redisExpireAsync = util.promisify(redisClient.expire).bind(redisClient);

// In-memory blacklist for development
const blacklistedTokens = [];

const generateVerificationToken = () => {
  return {
    token: crypto.randomBytes(32).toString("hex"),
    expiry: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes expiry
  };
};

const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
        logger.info(`User email: ${email}`);
        logger.info(`Request body: ${JSON.stringify(req.body)}`);


      return res.status(400).json({ error: "Email already in use" });
    }

    logger.info(`new user with unverified email: ${ name}, ${email}, ${password}`);

    // Create new user with unverified email
    const result = await User.create({
      name,
      email,
      password,
      email_verified: false, // Mark email as unverified
    });

        logger.info(`Generate a email_verified : ${email}`);

    // Generate a verification token
    const { token, expiry } = generateVerificationToken();

    // Log the generated token and verification URL
    logger.info(`Generated Token: ${token}`);
     logger.info(`expiry  Token: ${ expiry}`);
     
    // const verificationUrl = `https://aitool4all.com/verify-email?token=${token}`;
    // logger.info(`Verification URL: ${ verificationUrl}`);

    // Save the token and expiry to the user's record
    logger.info(`updateVerificationToken: ${email}`);
    await User.updateVerificationToken(email, token, expiry);
    
    logger.info(`Sending email to: ${email}`);


    // Send verification email
    await sendVerificationEmail(email, token);
 logger.info(`Send verification email to: ${email}`);
    // Respond to client
    res.status(201).json({
      message:
        "User registered successfully. Please check your email to verify your account."
    });
  } catch (error) {
    console.error("email verification error:",error);
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

    // Check if email is verified
    if (!user.email_verified) {
      return res.status(403).json({ error: "Email not verified" });
    }

    // Compare passwords
    const isMatch = await User.comparePassword(password, user.password);
    if (!isMatch)
      return res.status(401).json({ error: "Invalid email or password" });

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      config.jwtSecret,
      {
        expiresIn: "1h",
      }
    );
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const logout = async (req, res) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Extract token from headers

  if (!token) {
    return res.status(400).json({ message: "Token required" });
  }

  // Use Redis in production and in-memory blacklist in development
  if (process.env.NODE_ENV === "production") {
    try {
      // Store token in Redis with an expiration time (e.g., 1 hour)
      await redisSetAsync(token, "blacklisted");
      await redisExpireAsync(token, 60 * 60); // Expire in 1 hour

      return res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
      console.error("Redis error during logout:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  } else {
    // Development: Use in-memory token blacklist
    blacklistedTokens.push(token);
    return res.status(200).json({ message: "Logged out successfully" });
  }
};

const isTokenBlacklisted = async (token) => {
  if (process.env.NODE_ENV === "production") {
    try {
      // Check Redis if the token is blacklisted
      const result = await redisGetAsync(token);
      return result === "blacklisted";
    } catch (error) {
      console.error("Redis error during token check:", error);
      return false;
    }
  } else {
    // Development: Check in-memory blacklist
    return blacklistedTokens.includes(token);
  }
};


const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Generate a reset token
    const token = crypto.randomBytes(32).toString("hex");
    
    // Set expiry date to 10 minutes from now
    const expiryDate = new Date();
    
    // Call updateResetToken with a valid Date object
    await User.updateResetToken(email, token, expiryDate);

    // Send the reset token to the user's email
    await sendResetPasswordEmail(email, token);

    res.status(200).json({ message: "Reset link sent to your email" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    const user = await User.findByResetToken(token);
    if (!user) {
      return res.status(400).json({ error: "Invalid or expired token" });
    }

    await User.updatePassword(user.email, newPassword);

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};


const verifyEmail = async (req, res) => {
  const { token } = req.query;

  try {
    const user = await User.findByVerificationToken(token);

    if (!user) {
      return res.status(400).json({ error: "Invalid or expired token" });
    }

    // Call the new method to verify the user's email
    await User.verifyUserEmail(user.id);

    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};


module.exports = {
  register,
  login,
  logout,
  resetPassword,
  forgotPassword,
  verifyEmail,
  isTokenBlacklisted,
};
