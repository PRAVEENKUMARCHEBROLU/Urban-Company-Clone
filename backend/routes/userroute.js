// server/routes/userRoutes.js
const express = require("express");
const router = express.Router();
const {
  getUserProfile,
  updateUserProfile,
  deleteUser,
} = require("../controllers/usercontroller");

const { protect } = require("../middleware/authmiddleware");


router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);
router.delete("/delete", protect, deleteUser);

module.exports = router;
