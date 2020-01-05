const express = require('express')
const volleyball = require('volleyball')
const cors = require('cors')

require('dotenv').config()

const app = express()

app.use(volleyball)
app.use(cors({
    origin: 'http://localhost:8080'
}))
app.use(express.json())

// requiring router
const auth = require('./auth/index.js')

app.use('/auth', auth)

app.get('/', (req, res) => {
    res.json({
        message: 'Hello there!'
    })
})


// -- 404 -- 
function notFound(req, res, next) {
    res.status(404)
    const error = new Error('Not Found - ' + req.originalUrl)
    next(error)
}

// -- err --
function errorHandler(err, req, res, next) {
    res.status(res.statusCode || 500)
    res.json({
        message: err.message,
        stack: err.stack
    })
}

app.use(notFound)
app.use(errorHandler)

const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log('Listening on port - ', port)
})
