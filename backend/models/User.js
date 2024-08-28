const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String,
  gender: String,
  avatar: String,
  domain: String,
  available: Boolean
});

module.exports = mongoose.model('User', UserSchema);