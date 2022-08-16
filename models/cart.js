const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  products: {
    productId: mongoose.Schema.Types.ObjectId,
    ref: 'Craft',
    title: String,
    image: String,
    price: Number,
    quantity: Number,
  },
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
