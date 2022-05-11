const express = require('express');
const adminController = require('./../../controllers/adminController');

const router = express.Router();

router.get('/', adminController.admin);

router.get('/categories', adminController.category);

module.exports = router;
