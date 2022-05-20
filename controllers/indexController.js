const Post = require('../models/postModel');
const Category = require('../models/categoryModel');

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

exports.deletePost = (req, res) => {
  Post.deleteOne({ _id: req.params.id }).then(() => {
    res.redirect('/admin/posts');
  });
};
