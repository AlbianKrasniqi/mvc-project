const Post = require('../models/postModel');
const Category = require('../models/categoryModel');
const path = require('path');

exports.admin = (req, res) => {
  res.render('admin/index');
};

exports.category = (req, res) => {
  Category.find({})
    .sort({ $natural: -1 })
    .then((categories) => {
      res.render('admin/categories', { categories: categories });
    });
};

exports.createCateogry = (req, res) => {
  Category.create(req.body, (err, category) => {
    if (!err) {
      res.redirect('categories');
    } else {
      console.log('something went wrong');
    }
  });
};

exports.deleteCategory = (req, res) => {
  Category.remove({ _id: req.params.id }).then(() => {
    res.redirect('/admin/categories');
  });
};

exports.posts = (req, res) => {
  Post.find({})
    .populate({ path: 'category', model: Category })
    .sort({ $natural: -1 })
    .then((posts) => {
      res.render('admin/posts', { posts: posts });
    });
};

exports.getEditPost = (req, res) => {
  Post.findOne({ _id: req.params.id }).then((post) => {
    Category.find({}).then((categories) => {
      res.render('admin/editpost', { post: post, categories: categories });
    });
  });
};

exports.updatePost = (req, res) => {
  let post_image = req.files.post_image;

  post_image.mv(
    path.resolve(__dirname, '../public/img/postimages', post_image.name)
  );

  Post.findOne({ _id: req.params.id }).then((post) => {
    post.title = req.body.title;
    post.content = req.body.content;
    post.date = req.body.date;
    post.category = req.body.category;
    post.post_image = `/img/postimages/${post_image.name}`;

    post.save().then((post) => {
      res.redirect('/admin/posts');
    });
  });
};

exports.deletePost = (req, res) => {
  Post.deleteOne({ _id: req.params.id }).then(() => {
    res.redirect('/admin/posts');
  });
};
