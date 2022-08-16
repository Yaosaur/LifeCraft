const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  seller: { type: Boolean },
  crafts: [{ type: mongoose.Schema.ObjectId, ref: 'Craft' }],
  cart: { type: mongoose.Schema.ObjectId, ref: 'Cart' },
});

userSchema.plugin(passportLocalMongoose);
const User = mongoose.model('User', userSchema);

module.exports = User;
