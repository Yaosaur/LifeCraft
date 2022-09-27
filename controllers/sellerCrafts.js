const express = require('express');
const router = express.Router();
const { isSeller } = require('../utilities/authMiddleware');
const catchAsync = require('../utilities/catchAsync');
const ExpressError = require('../utilities/ExpressError');

const { craftSchema, Craft } = require('../models/craft');
const { craftValidSchema } = require('../utilities/schemas');

const validateCraft = (req, res, next) => {
  const { error } = craftValidSchema.validate(req.body);
  if (error) {
    throw new ExpressError(error.details[0].message, 400);
  } else {
    next();
  }
};

router.get(
  '/',
  isSeller,
  catchAsync(async (req, res) => {
    let crafts = undefined;
    const { title } = req.query;
    if (title) {
      crafts = await Craft.find({ title: new RegExp(`${title}`, 'i') });
    } else {
      crafts = await Craft.find({});
    }
    res.render('sellerIndex', { crafts, craftSchema });
  })
);

router.get(
  '/filter',
  isSeller,
  catchAsync(async (req, res) => {
    const { category } = req.query;
    const { price } = req.query;
    if (category) {
      let crafts = await Craft.find({ category: category });
      res.render('sellerIndex', { crafts, craftSchema });
    } else if (price) {
      let crafts = undefined;
      if (price === 'lt5') {
        crafts = await Craft.find({ price: { $lt: 5 } });
      } else if (price === 'gt50') {
        crafts = await Craft.find({ price: { $gt: 50 } });
      } else {
        crafts = await Craft.find({ price: { $gte: 5, $lte: 50 } });
      }
      res.render('sellerIndex', { crafts, craftSchema });
    }
  })
);

router.post('/', isSeller, validateCraft, (req, res, next) => {
  Craft.create(req.body, err => {
    if (err) {
      return next(err);
    }
    req.flash('success', 'Successfully listed a new Craft!');
    res.redirect('/api/v1/crafts');
  });
});

router.get(
  '/:id/edit',
  isSeller,
  catchAsync(async (req, res) => {
    const craft = await Craft.findById(req.params.id);
    res.render('edit', { craft, craftSchema });
  })
);

router.put('/:id', isSeller, validateCraft, (req, res, next) => {
  Craft.findByIdAndUpdate(req.params.id, req.body, err => {
    if (err) {
      return next(err);
    }
    res.redirect(`/api/v1/crafts/${req.params.id}`);
  });
});

router.delete('/:id', isSeller, (req, res, next) => {
  Craft.findByIdAndRemove(req.params.id, err => {
    if (err) {
      return next(err);
    }
    res.redirect('/api/v1/crafts/');
  });
});

router.get('/new', isSeller, (req, res) => {
  res.render('new', { craftSchema });
});

module.exports = router;
