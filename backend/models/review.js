const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  providerId: { type: mongoose.Schema.Types.ObjectId, ref: "Provider" },
  serviceId: { type: mongoose.Schema.Types.ObjectId, ref: "Service" },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("Review", reviewSchema);
