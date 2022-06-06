const express = require('express');
const contactController = require('../controllers/contactController');

const router = express.Router();

router.post('/email', contactController.sendEmail);

module.exports = router;
