const express = require("express");
const authController  = require("../controllers/authController");
const verifyToken = require("../middlewares/authMiddleware"); // ✅ Correct

const router = express.Router();
router.post("/register",authController.register);
router.post("/login", authController.login);
router.get("/my-profile",verifyToken,authController.getMyProfile);
module.exports = router;