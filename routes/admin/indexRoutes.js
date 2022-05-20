const express = require('express');
const adminController = require('../../controllers/indexController');

const router = express.Router();

router.get('/', adminController.admin);

router.get('/posts', adminController.posts);

router.get('/categories', adminController.category);

router.post('/categories', adminController.createCateogry);

router.delete('/categories/:id', adminController.deleteCategory);

module.exports = router;
