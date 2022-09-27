const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../utilities/authMiddleware');
const catchAsync = require('../utilities/catchAsync');
const ExpressError = require('../utilities/ExpressError');

const Cart = require('../models/cart');
const { Craft } = require('../models/craft');
const { cartValidSchema } = require('../utilities/schemas');

const validateCartProduct = (req, res, next) => {
  const { error } = cartValidSchema.validate(req.body);
  if (error) {
    throw new ExpressError(error.details[0].message, 400);
  } else {
    next();
  }
};

router.get(
  '/',
  catchAsync(async (req, res) => {
    let cart = undefined;
    let grandTotal = undefined;
    if (res.locals.currentUser) {
      cart = await Cart.findById(
        res.locals.currentUser.cart._id.toString()
      ).populate({
        path: 'products',
        populate: {
          path: 'product',
        },
      });
      const totalPrice = cart.products.map(x => x.product.price * x.quantity);
      grandTotal = totalPrice.reduce((prev, curr) => prev + curr, 0);
    }
    res.render('cart', { cart, grandTotal });
  })
);

router.put(
  '/',
  validateCartProduct,
  isLoggedIn,
  catchAsync(async (req, res, next) => {
    const product = await Craft.findById(req.body.craftId);
    const cart = await Cart.findById(
      res.locals.currentUser.cart._id.toString()
    );
    const foundItem = cart.products.find(
      listing => listing.product.toString() === product._id.toString()
    );
    if (foundItem === undefined) {
      cart.products.push({ product: product._id, quantity: req.body.quantity });
    } else {
      foundItem.quantity = req.body.quantity;
    }
    await cart.save();
    return res.redirect('/api/v1/cart');
  })
);

router.delete(
  '/checkout',
  isLoggedIn,
  catchAsync(async (req, res) => {
    const cart = await Cart.findByIdAndUpdate(
      res.locals.currentUser.cart._id.toString(),
      { products: [] }
    );
    cart.products.forEach(async product => {
      await Craft.findByIdAndUpdate(product.product, {
        $inc: { stock: -product.quantity },
      });
    });
  })
);

router.delete(
  '/:itemId',
  isLoggedIn,
  catchAsync(async (req, res) => {
    await Cart.findByIdAndUpdate(res.locals.currentUser.cart._id.toString(), {
      $pull: { products: { _id: req.params.itemId } },
    });
    res.redirect('/api/v1/cart');
  })
);

module.exports = router;
