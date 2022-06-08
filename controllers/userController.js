const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

exports.register = (req, res) => {
  res.render('site/register');
};

// exports.signup = (req, res) => {
//   User.create(req.body, (err, user) => {
//     req.session.backSessionFlash = {
//       type: 'alert alert-success',
//       message: 'Your User created successfully',
//     };
//     res.redirect('/users/login');
//   });
// };

exports.signup = async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = await new User({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
  });
  const savedUser = await user.save();
  req.session.backSessionFlash = {
    type: 'alert alert-success',
    message: 'Your User created successfully',
  };
  res.redirect('/users/login');
};

exports.login = (req, res) => {
  res.render('site/login');
};

exports.signin = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.redirect('/users/register');

  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.redirect('/users/login');
  req.session.userId = user._id;
  res.redirect('/');
};

// exports.signin = (req, res) => {
//   const { email, password } = req.body;
//   User.findOne({ email }, (err, user) => {
//     if (user) {
//       if (user.password == password) {
//         req.session.userId = user._id;
//         res.redirect('/');
//       } else {
//         res.redirect('/users/login');
//       }
//     } else {
//       res.redirect('/users/register');
//     }
//   });
// };

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
};
