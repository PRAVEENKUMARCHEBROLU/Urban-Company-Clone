const express = require("express");
const router = express.Router();

const {
  createBooking,
  getUserBookings,
  getProviderBookings,
  getAllBookings,
  updateBookingStatus
} = require("../controllers/bookingcontroller");

const { protect, adminonly, provideronly } = require("../middleware/authmiddleware");

// 1. User books a service
router.post("/", protect, createBooking);

// 2. Provider accepts/rejects a booking
router.put("/:id/status", protect, provideronly, updateBookingStatus); // Only providers

// 3. User gets their booking history
router.get("/user", protect, getUserBookings);

// 4. Provider gets bookings assigned to them
router.get("/provider", protect, getProviderBookings);

// 5. Admin can view all bookings
router.get("/", protect, adminonly, getAllBookings);

module.exports = router;

