const express = require("express");
const router = express.Router();
const {
  createReview,
  getProviderReviews,
  getServiceReviews
} = require("../controllers/reviewcontroller");

const { protect } = require("../middleware/authmiddleware");

router.post("/", protect, createReview);
router.get("/provider/:id", getProviderReviews);
router.get("/service/:id", getServiceReviews);

module.exports = router;
