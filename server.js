const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Craft = require('./models/craft');
const craftsData = require('./utilities/craftsData');

require('dotenv').config();
const port = process.env.PORT || 3003;

mongoose.connect(process.env.MONGO_URI, {});
mongoose.connection.once('open', () => {
  console.log('connected to mongo');
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/seed', async (req, res) => {
  await Craft.deleteMany({});
  await Craft.insertMany(craftsData);
  res.send('done!');
});

app.get('/api/v1/crafts', async (req, res) => {
  const crafts = await Craft.find({});
  res.render('index', { crafts });
});

app.get('/api/v1/crafts/:id', async (req, res) => {
  const craft = await Craft.findById(req.params.id);
  res.render('show', { craft });
});

app.listen(port, () => {
  console.log('I am listening on port', port);
});
