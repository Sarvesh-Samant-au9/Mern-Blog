const router = require("express").Router();

const { register, login, sendUser } = require("../Controller/authController");

const { isAuthenticated } = require("../Middleware/auth");

// Get User Details
router.get("/", isAuthenticated, sendUser);

// Register A User
router.post("/register", register);

// Login A User
router.post("/login", login);

module.exports = router;
