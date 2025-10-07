const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  role: { type: String,role:['user','provider','admin'], default: 'user' },
  email: { type: String, unique: true },
  password: String,
  googleId: String, // For Google OAuth

});

module.exports = mongoose.model('User', UserSchema);
