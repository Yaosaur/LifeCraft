const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Craft = require('./models/craft');
const craftsData = require('./utilities/craftsData');

require('dotenv').config();
const port = process.env.PORT || 3003;

mongoose.connect(process.env.MONGO_URI, {});
mongoose.connection.once('open', () => {
  console.log('connected to mongo');
});

app.get('/seed', async (req, res) => {
  await Craft.deleteMany({});
  await Craft.insertMany(craftsData);
  res.send('done!');
});

app.get('/api/v1/crafts', async (req, res) => {
  const crafts = await Craft.find({});
  res.send(crafts);
});

app.get('/api/v1/crafts/:id', async (req, res) => {
  const craft = await Craft.findById(req.params.id);
  res.send(craft);
});

app.listen(port, () => {
  console.log('I am listening on port', port);
});
