const express = require('express');
const Joi = require('joi');

const db = require('.././db/connection');

const pages = db.get('pages');

const schema = Joi.object().keys({
  name: Joi.string().trim().min(2).max(30)
    .required(),
  age: Joi.number().required(),
  experience: Joi.number().required(),
  genre: Joi.string().trim().required(),
  main_instrument: Joi.string().trim().required(),
  second_instrument: Joi.string().trim(),
  public: Joi.string().trim().required(),
  note: Joi.string().trim().max(500),
  avatar_link: Joi.string().trim().max(1000),
  youtube: Joi.string().trim().max(1000),
});

const router = express.Router();

router.get('/', (req, res) => {
  pages.find({
    user_id: req.user._id,
  })
    .then((pages) => {
      res.json(pages);
    });
});

router.post('/', (req, res, next) => {
  const result = Joi.validate(req.body, schema);
  if (result.error === null) {
    // insert in db
    const page = {
      ...req.body,
      user_id: req.user._id,
    };
    pages
      .insert(page)
      .then((page) => {
        res.json(page);
      });
  } else {
    const error = new Error(result.error);
    res.status(422);
    next(error);
  }
});

module.exports = router;
