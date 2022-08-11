const mongoose = require('mongoose');

const craftSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: {
    type: String,
    enum: ['jewelry', 'prints', 'clothing'],
    required: true,
  },
  image: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: String, required: true },
  stock: { type: String, required: true },
});

const Craft = mongoose.model('Craft', craftSchema);

module.exports = { craftSchema, Craft };
