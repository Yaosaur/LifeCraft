const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const { craftSchema, Craft } = require('./models/craft');
const craftsData = require('./utilities/craftsData');

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

app.get('/api/v1/crafts', async (req, res) => {
  const crafts = await Craft.find({});
  res.render('index', { crafts });
});

app.get('/api/v1/crafts/new', (req, res) => {
  res.render('new', { craftSchema });
});

app.post('/api/v1/crafts', (req, res) => {
  Craft.create(req.body, () => {
    res.redirect('/api/v1/crafts');
  });
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
