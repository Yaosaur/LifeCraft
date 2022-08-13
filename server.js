const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const { craftSchema, Craft } = require('./models/craft');
const craftsData = require('./utilities/craftsData');
const User = require('./models/user');
const bcrypt = require('bcrypt');

require('dotenv').config();
const port = process.env.PORT || 3003;

mongoose.connect(process.env.MONGO_URI, {});
mongoose.connection.once('open', () => {
  console.log('connected to mongo');
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));

app.get('/seed', async (req, res) => {
  await Craft.deleteMany({});
  await Craft.insertMany(craftsData);
  res.send('done!');
});

app.post('/register', async (req, res) => {
  const { email, username, password } = req.body;
  const hash = await bcrypt.hash(password, 12);
  User.create({ email, username, password: hash });
  res.redirect('/api/v1/crafts');
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    return res.send('Invalid credentials');
  }
  const validPassword = await bcrypt.compare(password, user.password);
  if (validPassword) {
    res.send('works!');
  } else {
    res.send('no!');
  }
});

app.get('/api/v1/crafts', async (req, res) => {
  let crafts = undefined;
  const { title } = req.query;
  if (title) {
    crafts = await Craft.find({ title: new RegExp(`${title}`, 'i') });
  } else {
    crafts = await Craft.find({});
  }
  res.render('index', { crafts, craftSchema });
});

app.get('/api/v1/crafts/new', (req, res) => {
  res.render('new', { craftSchema });
});

app.post('/api/v1/crafts', (req, res) => {
  Craft.create(req.body, () => {
    res.redirect('/api/v1/crafts');
  });
});

app.get('/api/v1/crafts/filter', async (req, res) => {
  const { category } = req.query;
  const { price } = req.query;
  if (category) {
    let crafts = await Craft.find({ category: category });
    res.render('index', { crafts, craftSchema });
  } else if (price) {
    let crafts = undefined;
    if (price === 'lt5') {
      crafts = await Craft.find({ price: { $lt: 5 } });
    } else if (price === 'gt50') {
      crafts = await Craft.find({ price: { $gt: 50 } });
    } else {
      crafts = await Craft.find({ price: { $gte: 5, $lte: 50 } });
    }
    res.render('index', { crafts, craftSchema });
  }
});

app.get('/api/v1/crafts/:id', async (req, res) => {
  const craft = await Craft.findById(req.params.id);
  res.render('show', { craft });
});

app.get('/api/v1/crafts/:id/edit', async (req, res) => {
  const craft = await Craft.findById(req.params.id);
  res.render('edit', { craft, craftSchema });
});

app.put('/api/v1/crafts/:id/', (req, res) => {
  Craft.findByIdAndUpdate(req.params.id, req.body, () => {
    res.redirect(`/api/v1/crafts/${req.params.id}`);
  });
});

app.delete('/api/v1/crafts/:id/', (req, res) => {
  Craft.findByIdAndRemove(req.params.id, () => {
    res.redirect('/api/v1/crafts/');
  });
});

app.listen(port, () => {
  console.log('I am listening on port', port);
});
