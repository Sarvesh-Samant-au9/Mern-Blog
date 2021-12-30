const router = require("express").Router();

const { register, login, sendUser } = require("../Controller/authController");

const { isAuthenticated } = require("../Middleware/auth");

router.get("/", isAuthenticated, sendUser);

router.post("/register", register);
router.post("/login", login);

module.exports = router;
