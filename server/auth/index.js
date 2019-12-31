const express = require('express')

const router = express.Router()

// Any route here is with /auth --

router.get('/', (req, res) => {
    res.json({
        message: "Lock"
    })
})

// POST auth/signup

router.post('/signup', (req, res) => {


    res.json({
        message: 'signup'
    })
})

module.exports = router