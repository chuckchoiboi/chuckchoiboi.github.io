const express = require('express')
const router = express.Router()

// middleware added to get requests to return oauth authentication to referrer
const returnPath = (req, res, next) => {
    req.session.returnTo = req.originalUrl
    next()
}

const ctrls = require('../controllers')

// http://localhost:3000/users

router.get('/new', ctrls.users.newUser)

router.put('/:id/edit', ctrls.users.updateUser)


module.exports = router