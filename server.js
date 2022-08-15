const express = require('express');
const app = express();
const ejsMate = require('ejs-mate');
const path = require('path');
const session = require('express-session');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const flash = require('connect-flash');
const { craftSchema, Craft } = require('./models/craft');
const craftsData = require('./utilities/craftsData');
const User = require('./models/user');
const { isLoggedIn, checkReturnTo } = require('./middleware');

require('dotenv').config();
const port = process.env.PORT || 3003;

mongoose.connect(process.env.MONGO_URI, {});
mongoose.connection.once('open', () => {
  console.log('connected to mongo');
});

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const sessionOptions = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: Date.now() + 1000 * 60 * 60 * 24,
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true,
  },
};
app.use(session(sessionOptions));

app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash('success');
  next();
});

app.get('/seed', async (req, res) => {
  await Craft.deleteMany({});
  await Craft.insertMany(craftsData);
  res.send('done!');
});

app.get('/api/v1/', (req, res) => {
  res.send('Home!');
});

app.post('/register', async (req, res, next) => {
  let { email, username, password, seller } = req.body;
  seller === 'on' ? (seller = true) : (seller = false);
  const user = new User({ email, username, seller });
  const registeredUser = await User.register(user, password);
  req.login(registeredUser, err => {
    if (err) {
      return next(err);
    } else {
      res.redirect('/api/v1/');
    }
  });
});

app.post(
  '/login',
  checkReturnTo,
  passport.authenticate('local', {
    failureFlash: true,
    failureRedirect: '/api/v1/',
  }),
  async (req, res) => {
    const redirectUrl = res.locals.returnTo || '/api/v1/';
    console.log(res.locals.checkReturnTo);
    res.redirect(redirectUrl);
  }
);

app.get('/logout', (req, res, err) => {
  req.logout(err => {
    if (err) {
      return next(err);
    } else {
      res.redirect('/api/v1/');
    }
  });
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
    req.flash('success', 'Successfully listed a new Craft!');
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

app.get('/api/v1/crafts/:id/edit', isLoggedIn, async (req, res) => {
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
