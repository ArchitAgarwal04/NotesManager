const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/authController');
const { body } = require('express-validator');

router.post('/signup', [
  body('name').notEmpty(),
  body('email').isEmail(),
  body('password').notEmpty()
], signup);

router.post('/login', [
  body('email').isEmail(),
  body('password').notEmpty()
], login);

module.exports = router; 