const router = require("express").Router();
const {
  getParticularUser,
  getAllUsers,
  updateUser,
  deleteUser,
} = require("../Controller/userController");
const { isAuthenticated, isOwner } = require("../Middleware/auth");
router.get("/", isAuthenticated, getAllUsers);
router.get("/:userId", getParticularUser);

router.put("/:userId", isAuthenticated, isOwner, updateUser);
router.delete("/:userId", isAuthenticated, isOwner, deleteUser);

module.exports = router;
