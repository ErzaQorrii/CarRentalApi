const jwt = require("jsonwebtoken");
require("dotenv").config();

const secret_key = process.env.JWT_SECRET || "secretkey";

const verifyToken = (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(403)
      .json({ message: "Access denied. No token provided." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, secret_key);

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
module.exports = verifyToken;
