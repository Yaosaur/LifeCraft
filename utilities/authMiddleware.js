module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl;
    req.flash('error', 'Log in to your account first!');
    return res.redirect('/api/v1/');
  }
  next();
};

module.exports.isSeller = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl;
    req.flash('error', 'Log in to your account first!');
    return res.redirect('/api/v1/');
  }
  if (res.locals.currentUser.seller === false) {
    req.flash('error', 'You need a seller account for that feature!');
    return res.redirect('/api/v1/');
  }
  next();
};

module.exports.checkReturnTo = (req, res, next) => {
  if (req.session.returnTo) {
    res.locals.returnTo = req.session.returnTo;
  }
  next();
};
