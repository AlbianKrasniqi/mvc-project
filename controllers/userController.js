const User = require('../models/userModel');

exports.register = (req, res) => {
  res.render('site/register');
};

exports.signup = (req, res) => {
  User.create(req.body, (err, user) => {
    req.session.backSessionFlash = {
      type: 'alert alert-success',
      message: 'Your User created successfully',
    };
    res.redirect('/users/login');
  });
};

exports.login = (req, res) => {
  res.render('site/login');
};

exports.signin = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if (user) {
      if (user.password == password) {
        req.session.userId = user._id;
        res.redirect('/');
      } else {
        res.redirect('/users/login');
      }
    } else {
      res.redirect('/users/register');
    }
  });
};
