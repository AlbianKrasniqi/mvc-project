const express = require('express');
const adminController = require('../../controllers/indexController');

const router = express.Router();

router.get('/', adminController.admin);

router.get('/categories', adminController.category);

router.post('/categories', adminController.createCateogry);

router.delete('/categories/:id', adminController.deleteCategory);

router.get('/posts', adminController.posts);

router.get('/posts/edit/:id', adminController.getEditPost);

router.put('/posts/:id', adminController.updatePost);

router.delete('/posts/:id', adminController.deletePost);

module.exports = router;
