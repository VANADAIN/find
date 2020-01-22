const express = require('express')
const db = require('../db/connection')
const Joi = require('joi')
const bcrypt = require('bcryptjs')

const users = db.get('users')

const router = express.Router()

const schema = Joi.object().keys({
    username: Joi.string().trim().regex(/(^[a-zA-Z0-9_]*$)/)
    .min(3).max(30), 
    email: Joi.string().trim().email(),
    password: Joi.string().trim().min(8),
    role: Joi.string().valid('user', 'admin'),
    active: Joi.bool()
})

router.get('/', async (req, res, next) => {
    try {
        const result = await users.find({}, '-password')
        res.json(result)
    } catch (error) {
        next(error)
    }
    
})

router.patch('/:id', async (req, res, next) => {
    // validate req.body
    // find a user with given id
    // update user
    
    const { id: _id } = req.params
    try {
        const result = Joi.validate(req.body, schema)
        if (!result.error) {
            const query = { _id }
            const user = await users.findOne(query)

            if (user) {
                const updatedUser = req.body
                // check if contains new password
                if (updatedUser.password) {
                    updatedUser.password = await bcrypt.hash(updatedUser.password, 12)
                }
                
                const result = await users.findOneAdUpdate(query, {
                    $set: updatedUser
                })
                delete result.password
                res.json(result)
            } else {
                next()
            }

        } else {
            res.status(422)
            throw new Error(result.error)
        }
        
    } catch (error) {
        next(error)
    }
})

module.exports = router