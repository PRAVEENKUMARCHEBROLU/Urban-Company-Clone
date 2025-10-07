const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Provider = require("../models/provider");
const Service = require("../models/services");





// Register as a Provider
exports.registerProvider = async (req, res) => {
  const { services, location } = req.body;
  const userId = req.user.id;

  try {
    const existing = await Provider.findOne({ userId });
    if (existing)
      return res.status(400).json({ message: "Already registered as provider" });

    // Step 1: Create the provider
    const provider = new Provider({
      userId,
      services,
      location,
    });
    await provider.save();

    // ✅ Step 2: Assign this provider to each selected service
    for (const serviceId of services) {
      await Service.findByIdAndUpdate(serviceId, {
        providerId: provider._id,
      });
    }

    res.status(201).json({ message: "Provider registered", provider });
  } catch (error) {
    console.error("Error in registerProvider:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


// Get all providers (admin use)
exports.getAllProviders = async (req, res) => {
  try {
      const providers = await Provider.find().populate("userId", "name email");
  res.json(providers);
  } catch (error) {
    console.error("Error in getAllProviders:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get current provider profile
exports.getMyProviderProfile = async (req, res) => {
  try {
    const provider = await Provider.findOne({ userId: req.user.id });

    if (!provider) {
      return res.status(404).json({ message: "Provider profile not found" });
    }
    res.json(provider);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
