const express = require('express');
const app = express();
const ejsMate = require('ejs-mate');
const path = require('path');
const session = require('express-session');
const Redis = require('ioredis');
const RedisStore = require('connect-redis')(session);
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const flash = require('connect-flash');
const craftsData = require('./utilities/craftsData');
const User = require('./models/user');
const { checkReturnTo } = require('./middleware');

require('dotenv').config();
const port = process.env.PORT || 3003;

const redisClient = new Redis({
  host: process.env.REDIS_HOSTNAME,
  port: process.env.REDIS_PORT,
  username: 'default',
  password: process.env.REDIS_PASSWORD,
});
redisClient.on('connect', () => console.log('connected to redis'));

mongoose.connect(process.env.MONGO_URI, {});
mongoose.connection.once('open', () => {
  console.log('connected to mongo');
});

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
const sessionOptions = {
  store: new RedisStore({ client: redisClient }),
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
app.use(express.json());
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

const craftsController = require('./controllers/crafts.js');
const sellerCraftsController = require('./controllers/sellerCrafts.js');
const cartController = require('./controllers/cart.js');
app.use('/api/v1/crafts', craftsController);
app.use('/api/v1/seller/crafts', sellerCraftsController);
app.use('/api/v1/cart', cartController);

//Seed route for development purposes only!
// app.get('/seed', async (req, res) => {
//   await Craft.deleteMany({});
//   await Craft.insertMany(craftsData);
//   res.send('done!');
// });

app.get('/api/v1/', async (req, res) => {
  res.render('home');
});

app.post('/register', async (req, res, next) => {
  let { email, username, password, seller } = req.body;
  seller === 'on' ? (seller = true) : (seller = false);
  const cart = new Cart();
  await cart.save();
  const user = new User({ email, username, seller, cart });
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
    res.redirect(redirectUrl);
  }
);

app.get('/api/v1/logout', (req, res, err) => {
  req.logout(err => {
    if (err) {
      return next(err);
    } else {
      res.redirect('/api/v1/');
    }
  });
});

app.listen(port, () => {
  console.log('I am listening on port', port);
});
