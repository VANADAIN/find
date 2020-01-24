const express = require('express');
const Joi = require('joi');
const bcrypt = require('bcryptjs');
const db = require('.././db/connection');

const users = db.get('users');

const controller = require('../controllers/users.controller');

const router = express.Router();

const schema = Joi.object().keys({
  username: Joi.string().trim().regex(/(^[a-zA-Z0-9_]*$)/)
    .min(3)
    .max(30),
  email: Joi.string().trim().email(),
  password: Joi.string().trim().min(8),
  role: Joi.string().valid('user', 'admin'),
  active: Joi.bool(),
});

router.get('/', controller.list);

router.patch('/:id', controller.updateOne);

module.exports = router;
