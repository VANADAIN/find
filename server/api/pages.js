const express = require('express')
const Joi = require('joi')

const db = require('../db/connection')
const pages = db.get('pages')

// newPage: {
//     name: '',
//     age: null,
//     experience: null,
//     genre: '',
//     main_instrument: '',
//     second_instrument: '',
//     public: '',
//     note: '',
//     avatar_link: '',
//     youtube: '',
//   }

const schema = Joi.object().keys({
    name: Joi.string().trim().min(2).max(30).required(), 
    age: Joi.integer().trim().max(2).required(),
    experience: Joi.number().trim().max(2).required(),
    genre: Joi.string().trim().required(),
    main_instrument: Joi.string().trim().required(),
    second_instrument: Joi.string().trim(),
    public: Joi.string().trim().required(),
    note: Joi.string().trim().max(500),
    avatar_link: Joi.string().trim().max(1000),
    youtube: Joi.string().trim().max(1000),
})

const router = express.Router()

router.get('/', (req, res) => {
    res.json([])
})

router.post('/', (req, res, next) => {
    const result = Joi.validate(req.body, schema)
    if (result.error === null) {
        // insert in db
    } else {
        const error = new Error(result.error)
        res.status(422)
        next(error)
    }

})

module.exports = router
