const Review = require("../models/review.js");

// Submit review
exports.createReview = async (req, res) => {
  const { providerId, serviceId, rating, comment } = req.body;

  try {
    const newReview = new Review({
      userId: req.user._id,
      providerId,
      serviceId,
      rating,
      comment
    });

    await newReview.save();
    res.status(201).json({ message: "Review added", review: newReview });
  } catch (err) {
    res.status(500).json({ message: "Review failed", error: err.message });
  }
};

// Get reviews for a provider
exports.getProviderReviews = async (req, res) => {
  const providerId = req.params.id;
  const reviews = await Review.find({ providerId }).populate("userId", "name");
  res.json(reviews);
};

// Get reviews for a service
exports.getServiceReviews = async (req, res) => {
  const serviceId = req.params.id;
  const reviews = await Review.find({ serviceId }).populate("userId", "name");
  res.json(reviews);
};
