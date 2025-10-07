const express = require('express');
const passport = require('passport');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Register
exports.register = async (req, res) => {
  try {
    const { name, role, email, password } = req.body;

    // Check for existing user
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'User already exists' });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    user = new User({ name, role, email, password: hashedPassword });
    await user.save();

    // Generate JWT token
    const payload = { user: { id: user.id, role: user.role } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Success response
    res.status(201).json({
      msg: "User registered successfully",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};


// Login
exports.login = async (req, res) => {
  const { email, password } = req.body;


  // Validate input
  const user = await User.findOne({ email });
  if (!user) return res.json({ msg: 'Email Invalid' });

  // Check password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.json({ msg: 'Password Invalid' });

  // Create JWT token
     const payload = { user: 
        { 
          id: user.id,
          role: user.role
        } 
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
     });

  res.json({ 
    token, 
    user: { 
        id: user.id, 
        name: user.name, 
        email: user.email, 
        role: user.role
     }, 
    });
};






