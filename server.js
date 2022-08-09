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

app.listen(port, () => {
  console.log('I am listening on port', port);
});
