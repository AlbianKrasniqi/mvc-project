const Post = require('../models/postModel');
const Category = require('../models/categoryModel');
const path = require('path');

exports.addpost = (req, res) => {
  if (!req.session.userId) {
    res.redirect('users/login');
  }
  Category.find({}).then((categories) => {
    res.render('site/addpost', { categories: categories });
  });
};

exports.addposttest = (req, res) => {
  let post_image = req.files.post_image;

  post_image.mv(
    path.resolve(__dirname, '../public/img/postimages', post_image.name)
  );

  Post.create({
    ...req.body,
    post_image: `/img/postimages/${post_image.name}`,
  });

  req.session.backSessionFlash = {
    type: 'alert alert-success',
    message: 'Your Post created successfully',
  };

  res.redirect('/posts/blog');
};

exports.getAllPosts = (req, res) => {
  Post.find({})
    .sort({ $natural: -1 })
    .then((posts) => {
      Category.find({}).then((categories) => {
        res.render('site/blog', { posts: posts, categories: categories });
      });
    });
};

exports.singlepost = (req, res) => {
  Post.findById(req.params.id).then((post) => {
    res.render('site/post', { post: post });
  });
};
