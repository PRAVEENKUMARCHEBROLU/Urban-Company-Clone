// server/routes/providerRoutes.js
const express = require("express");
const router = express.Router();
const {
  registerProvider,
  getAllProviders,
  getMyProviderProfile
} = require("../controllers/providercontroller");

const { protect, adminonly } = require("../middleware/authmiddleware");
const { getallproviders } = require("../controllers/admincontroller");

router.post("/", protect, registerProvider);           // Register as provider
router.get("/", protect, adminonly, getallproviders); // Admin: view all
router.get("/me", protect, getMyProviderProfile);     // Get own profile

module.exports = router;
