const express = require('express')
const Joi = require('joi')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const db = require('../db/connection')
const users = db.get('users')
users.createIndex('username', { unique: true })

const router = express.Router()

// Any route here is with /auth --

router.get('/', (req, res) => {
    res.json({
        message: "Lock"
    })
})

// POST auth/signup
const schema = Joi.object().keys({
    username: Joi.string().trim().regex(/(^[a-zA-Z0-9_]*$)/).min(3).max(30).required(), 
    email: Joi.string().trim().email(),
    password: Joi.string().trim().min(8).required()
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
                res.status(409)
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
                        delete insertedUser.password
                        res.json(insertedUser)
                    })
                })
            }
        })
    } else {
        res.status(422)
        // goes to the errorhandler
        next(result.error) 
    }
})

function respondError422(res, next) {
    res.status(422)
    const error = new Error('Unable to login.')
    next(error)
}

router.post('/login', (req, res, next) => {
    const result = Joi.validate(req.body, schema)

    if (result.error == null) {
        users.findOne({
            username: req.body.username
        })
        .then(user => {
            if (user) {
                // find the user, compare the 
                // password to 'user' in db
                bcrypt.compare(req.body.password, user.password)
                .then((result) => {
                    if (result) {
                        // right password
                        const payload = {
                            _id: user._id,
                            username: user.username
                        }

                        // JWT part --
                        
                        jwt.sign(payload, process.env.TOKEN_SECRET, {
                            expiresIn: '1d'
                        }, (err, token) => {
                            if (err) {
                                respondError422(res, next)
                            } else {
                                res.json({ token })
                            }
                        })

                    } else {
                        respondError422(res, next)
                    }
                    
                })
            } else {
                respondError422(res, next)
            }
        })
    } else {
        respondError422(res, next)
    }
    
})


module.exports = router