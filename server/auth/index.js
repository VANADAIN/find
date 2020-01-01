const express = require('express')
const Joi = require('joi')
const bcrypt = require('bcryptjs')

const db = require('../db/connection')
const users = db.get('users')
users.createIndex('username', { unique: true})

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
    email: Joi.string().email(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{8,30}$/).required()
})

router.post('/signup', (req, res, next) => {
    const result = Joi.validate(req.body, schema)

    if (result.error == null) {
        // unique username check
        users.findOne({
            username: req.body.username
        })
        .then(user => {
            // there is user -> err
            if (user){
                const error = new Error('That username is already taken')
                next(error)
            } else {
                // hash password and register
                bcrypt.hash(req.body.password, 12).then(hashedPassword => {
                    const newUser = {
                        username: req.body.username,
                        password: hashedPassword,
                        email: req.body.email
                    }

                    users.insert(newUser).then(insertedUser => {
                        res.json(insertedUser)
                    })
                })
            }
        })
    } else {
        // goes to the errorhandler
        next(result.error) 
    }
})

module.exports = router