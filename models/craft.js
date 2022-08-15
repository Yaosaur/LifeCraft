const mongoose = require('mongoose');

const craftSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: {
    type: String,
    enum: ['jewelry', 'prints', 'clothing', 'ceramics', 'plants'],
    required: true,
  },
  image: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
});

const Craft = mongoose.model('Craft', craftSchema);

module.exports = { craftSchema, Craft };
