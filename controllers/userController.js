const User = require('../models/userModel');

exports.register = (req, res) => {
  res.render('site/register');
};

exports.signup = (req, res) => {
  User.create(req.body, (err, user) => {
    res.redirect('/');
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
        // User session
        res.redirect('/posts');
        console.log('ok');
      } else {
        res.redirect('/users/login');
      }
    } else {
      res.redirect('/users/register');
      console.log('wrong');
    }
  });
};
