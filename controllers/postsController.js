const Post = require('../models/postModel');

exports.addpost = (req, res) => {
  res.render('site/addpost');
};

exports.addposttest = (req, res) => {
  Post.create(req.body);
  res.redirect('/posts');
};

exports.getAllPosts = (req, res) => {
  Post.find({}).then((posts) => {
    res.render('site/blog', { posts: posts });
  });
};

exports.singlepost = (req, res) => {
  Post.findById(req.params.id).then((post) => {
    res.render('site/post', { post: post });
  });
};
