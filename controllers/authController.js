const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  createUser,
  getUserByUsername,
  getUserById,
} = require("../repositories/userRepository");

const secret_key = process.env.JWT_SECRET || "secretkey";

exports.register = async (req, res) => {
  try {
    let { fullName, email, username, password } = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    fullName = fullName?.trim();
    email = email?.trim();
    username = username?.trim();

    const errors = [];
    if (!fullName) errors.push("Full name is required");
    if (!email) errors.push("Email is required");
    if (!username) errors.push("Username is required");
    if (!password) errors.push("Password is required");
    if (password && password.length < 6)
      errors.push("Password should be at least 6 characters");
    if (email && !emailRegex.test(email)) errors.push("Invaild email format");

    if (errors.length > 0) {
      return res.status(400).json({ message: "Validation failed", errors });
    }
    const user = await createUser(fullName, email, username, password);
    return res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
exports.login = async (req, res) => {
  try {
    const errors = [];
    let { username, password } = req.body;
    username = username?.trim();
    password = password?.trim();

    if (!username) errors.push("Username is required");
    if (!password) errors.push("Password is required");

    if (errors.length > 0) {
      return res.status(400).json({ message: "Validation failed", errors });
    }

    let user = await getUserByUsername(username);
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "The password is not correct" });
    const token = jwt.sign(
      { userId: user._id.toString(), username },
      secret_key,
      { expiresIn: "1h" }
    );
    res.status(200).json({ message: "Log In successful", token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMyProfile = async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await getUserById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
