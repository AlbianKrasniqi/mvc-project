const Post = require('../models/postModel');
const Category = require('../models/categoryModel');
const User = require('../models/userModel');
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
    author: req.session.userId,
  });

  req.session.backSessionFlash = {
    type: 'alert alert-success',
    message: 'Your Post created successfully',
  };

  res.redirect('/posts/blog');
};

exports.getAllPosts = (req, res) => {
  const postPerPage = 2;
  const page = req.query.page || 1;

  Post.find({})
    .populate({ path: 'author', model: User })
    .sort({ $natural: -1 })
    .skip(postPerPage * page - postPerPage)
    .limit(postPerPage)
    .then((posts) => {
      Post.countDocuments().then((postCount) => {
        Category.aggregate([
          {
            $lookup: {
              from: 'posts',
              localField: '_id',
              foreignField: 'category',
              as: 'posts',
            },
          },
          {
            $project: {
              _id: 1,
              name: 1,
              num_of_posts: { $size: '$posts' },
            },
          },
        ]).then((categories) => {
          res.render('site/blog', {
            posts: posts,
            categories: categories,
            current: parseInt(page),
            pages: Math.ceil(postCount / postPerPage),
          });
        });
      });
    });
};

function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

exports.getSearch = (req, res) => {
  if (req.query.look) {
    const regex = new RegExp(escapeRegex(req.query.look), 'gi');
    Post.find({ title: regex })
      .populate({ path: 'author', model: User })
      .sort({ $natural: -1 })
      .then((posts) => {
        Category.aggregate([
          {
            $lookup: {
              from: 'posts',
              localField: '_id',
              foreignField: 'category',
              as: 'posts',
            },
          },
          {
            $project: {
              _id: 1,
              name: 1,
              num_of_posts: { $size: '$posts' },
            },
          },
        ]).then((categories) => {
          res.render('site/blog', { posts: posts, categories: categories });
        });
      });
  }
};

exports.getGroupCategory = (req, res) => {
  Post.find({ category: req.params.categoryId })
    .populate({ path: 'category', model: Category })
    .populate({ path: 'author', model: User })
    .then((posts) => {
      Category.aggregate([
        {
          $lookup: {
            from: 'posts',
            localField: '_id',
            foreignField: 'category',
            as: 'posts',
          },
        },
        {
          $project: {
            _id: 1,
            name: 1,
            num_of_posts: { $size: '$posts' },
          },
        },
      ]).then((categories) => {
        res.render('site/blog', { posts: posts, categories: categories });
      });
    });
};

exports.singlepost = (req, res) => {
  Post.findById(req.params.id)
    .populate({ path: 'author', model: User })
    .then((post) => {
      Category.aggregate([
        {
          $lookup: {
            from: 'posts',
            localField: '_id',
            foreignField: 'category',
            as: 'posts',
          },
        },
        {
          $project: {
            _id: 1,
            name: 1,
            num_of_posts: { $size: '$posts' },
          },
        },
      ]).then((categories) => {
        Post.find({})
          .populate({ path: 'author', model: User })
          .sort({ $natural: -1 })
          .then((posts) => {
            res.render('site/post', {
              post: post,
              categories: categories,
              posts: posts,
            });
          });
      });
    });
};
