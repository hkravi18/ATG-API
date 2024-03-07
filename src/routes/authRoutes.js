const express = require('express');
const router = express.Router();

const { signup, login } = require('../controllers/authController.js');

router.get('/signup', signup);
router.get('/login', login);

module.exports = router;