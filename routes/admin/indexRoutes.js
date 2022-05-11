const express = require('express');
const adminController = require('../../controllers/indexController');

const router = express.Router();

router.get('/', adminController.admin);

router.get('/categories', adminController.category);

router.post('/categories', adminController.createOne);

module.exports = router;
