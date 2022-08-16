const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  products: [
    {
      product: { type: mongoose.Schema.ObjectId, ref: 'Craft' },
      quantity: Number,
    },
  ],
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
