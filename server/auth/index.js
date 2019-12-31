const express = require('express')
const Joi = require('joi')

const db = require('../db/connection.js')

const router = express.Router()

// Any route here is with /auth --

router.get('/', (req, res) => {
    res.json({
        message: "Lock"
    })
})

// POST auth/signup
const schema = Joi.object().keys({
    username: Joi.string().regex(/(^[a-zA-Z0-9_]*$)/).min(3).max(30).required(), 
    password: Joi.string().regex(/^[a-zA-Z0-9]{8,30}$/).required(),
    email: Joi.string().email()
})

router.post('/signup', (req, res) => {
    const result = Joi.validate(req.body, schema)

    res.json(result)
})

module.exports = router