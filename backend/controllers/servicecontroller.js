const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const service = require("../models/services");


// Create service (admin only)
exports.createService = async (req, res) => {
  try {
    const { name, description, price, category, image } = req.body;
    const newservice = await service.create({ name, description, price, category, image });
    res.status(201).json(newservice);
  } catch (err) {
    res.status(400).json({ message: "Error creating service", error: err.message });
    console.error(err);
  }
};

// Get all services (public)
// controller/serviceController.js

exports.getAllServices = async (req, res) => {
  try {
    console.log("📦 Fetching services...");
    const services = await service.find();
    res.json({ services });
  } catch (err) {
    console.error("❌ Error fetching services:", err.message);
    res.status(500).json({ message: "Error fetching services", error: err.message });
  }
};



// Get single service by ID
exports.getServiceById = async (req, res) => {
  try {
    const newservice = await service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.json(newservice);
  } catch (err) {
    console.error("Service Fetch Error:", err.message);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};



// Update service (admin only)
exports.updateService = async (req, res) => {
  const updated = await service.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!updated) return res.status(404).json({ message: "Service not found" });
  res.json(updated);
};

// Delete service (admin only)
exports.deleteService = async (req, res) => {
  const deleted = await service.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ message: "Service not found" });
  res.json({ message: "Service deleted" });
};
