const express = require('express');
const postsController = require('../controllers/postController');

const router = express.Router();

router.get('/new', postsController.addpost);

router.post('/test', postsController.addposttest);

// router.get('/', postsController.getAllPosts);

router.get('/', postsController.getAllPosts);

router.get('/:id', postsController.singlepost);

module.exports = router;
