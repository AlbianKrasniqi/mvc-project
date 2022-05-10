const Post = require('../models/postModel');

exports.index = (req, res) => {
  console.log(req.session);
  res.render('site/index');
};

exports.about = (req, res) => {
  res.render('site/about');
};

// exports.blog = (req, res) => {
//   Post.find().then((posts) => {
//     res.render('site/blog', { posts: posts });
//   });
// };

exports.contact = (req, res) => {
  res.render('site/contact');
};
