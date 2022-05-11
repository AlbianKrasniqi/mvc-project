const Category = require('../models/categoryModel');

exports.admin = (req, res) => {
  res.render('admin/index');
};

exports.category = (req, res) => {
  Category.find({}).then((categories) => {
    res.render('admin/categories', { categories: categories });
  });
};

exports.createOne = (req, res) => {
  Category.create(req.body, (err, category) => {
    if (!err) {
      res.redirect('categories');
    } else {
      console.log('something went wrong');
    }
  });
};
