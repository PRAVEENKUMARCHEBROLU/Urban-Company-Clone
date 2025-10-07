const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const Provider = require('../models/provider');


// all get users
exports.getallusers = async (req, res) => {
  try {
    const users = await User.find({ role: 'user' });
    res.json({ users });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};
// all get providers
exports.getallproviders = async (req, res) => {
  try {
    const providers = await Provider.find().populate("userId", "name email");
    res.json({ providers });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

//approve or reject provider
exports.approveprovider = async (req, res) =>{
    const { id } = req.params;
    const { status} = req.body;
    console.log("Incoming ID:", id);
    const provider = await Provider.findById(id);
    console.log("Found provider:", provider);
    if (!provider) {
        return res.status(404).json({message:"provider error"});
        
    }
        provider.status = status;
        await provider.save();
        res.json({message:"provider status updated", provider});

};


