const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  buyer: { type: Boolean },
  seller: { type: Boolean },
  crafts: { type: Array },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
