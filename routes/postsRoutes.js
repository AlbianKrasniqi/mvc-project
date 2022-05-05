const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postsController');

router.get('/new', postsController.addpost);

router.post('/test', postsController.addposttest);

// router.get('/', postsController.getAllPosts);

router.get('/', postsController.getAllPosts);

router.get('/:id', postsController.singlepost);

module.exports = router;
