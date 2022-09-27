const express = require('express');
const router = express.Router();

const { craftSchema, Craft } = require('../models/craft');

router.get('/', async (req, res) => {
  let crafts = undefined;
  const { title } = req.query;
  if (title) {
    crafts = await Craft.find({ title: new RegExp(`${title}`, 'i') });
  } else {
    crafts = await Craft.find({});
  }
  res.render('index', { crafts, craftSchema, title });
});

router.get('/filter', async (req, res) => {
  const { category } = req.query;
  const { price } = req.query;
  if (category) {
    let crafts = await Craft.find({ category: category });
    res.render('index', { crafts, craftSchema, title: undefined });
  } else if (price) {
    let crafts = undefined;
    if (price === 'lt5') {
      crafts = await Craft.find({ price: { $lt: 5 } });
    } else if (price === 'gt50') {
      crafts = await Craft.find({ price: { $gt: 50 } });
    } else {
      crafts = await Craft.find({ price: { $gte: 5, $lte: 50 } });
    }
    res.render('index', { crafts, craftSchema, title: undefined });
  }
});

router.get('/:id', async (req, res) => {
  const craft = await Craft.findById(req.params.id);
  res.render('show', { craft });
});

module.exports = router;
