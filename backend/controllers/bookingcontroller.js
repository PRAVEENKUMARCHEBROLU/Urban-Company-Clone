const Booking = require("../models/booking.js");

// Create a new booking
exports.createBooking = async (req, res) => {
  try {
    const { providerId, serviceId, date, time, address } = req.body;

    const booking = await Booking.create({
      userId: req.user.id,
      providerId,
      serviceId,
      date,
      time,
      address
    });

    res.status(201).json({ message: "Booking created", booking });
  } catch (err) {
    res.status(400).json({ message: "Booking failed", error: err.message });
  }
};

// Update status: Accept or Cancel booking
exports.updateBookingStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const booking = await Booking.findById(id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    booking.status = status;
    await booking.save();

    res.json({ message: "Booking status updated", booking });
  } catch (error) {
    res.status(500).json({ message: "Failed to update status", error });
  }
};

// (Optional) Approve booking (same as updateBookingStatus)
exports.approveBooking = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    booking.status = status;
    await booking.save();

    res.json({ message: "Booking status updated", booking });
  } catch (err) {
    res.status(400).json({ message: "Error updating booking", error: err.message });
  }
};

// Get all bookings of the logged-in USER
exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.id })
      .populate("serviceId")      // Get full service info
      .populate("providerId", "location name")  // Optional provider info
      .populate("userId", "name");              // Optional user info

    res.json({ bookings });
  } catch (err) {
    console.error("Get User Bookings Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all bookings assigned to logged-in PROVIDER
exports.getProviderBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ providerId: req.user.id })
      .populate("serviceId")  // Service info
      .populate("userId", "name email"); // Who booked it

    res.json({ bookings });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch provider bookings", error: err.message });
  }
};

// Admin only: Get all bookings in system
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("serviceId")
      .populate("userId", "name email")
      .populate("providerId", "name");

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Error fetching all bookings", error: err.message });
  }
};

