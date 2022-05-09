const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/register', userController.register);

router.post('/register', userController.signup);

router.get('/login', userController.login);

router.post('/login', userController.signin);

module.exports = router;
