const Post = require('../models/postModel');
const path = require('path');

exports.addpost = (req, res) => {
  res.render('site/addpost');
};

exports.addposttest = (req, res) => {
  let post_image = req.files.post_image;

  post_image.mv(
    path.resolve(__dirname, '../public/img/postimages', post_image.name)
  );

  Post.create({
    ...req.body,
    post_image: `/public/img/postimages/${post_image.name}`,
  });

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
