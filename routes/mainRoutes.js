const express = require('express');
const mainController = require('../controllers/mainController');
const router = express.Router();

router.get('/', mainController.index);

router.get('/about', mainController.about);

// router.get('/posts/blog', mainController.blog);

router.get('/contact', mainController.contact);

module.exports = router;
