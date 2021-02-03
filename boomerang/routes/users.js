const express = require('express')
const router = express.Router()

// middleware added to get requests to return oauth authentication to referrer
const returnPath = require('../middleware/returnPath')
const authRequired = require('../middleware/authRequired')

const ctrls = require('../controllers')

// http://localhost:3000/users

router.get('/new', ctrls.users.newUser)

router.put('/update/:id', ctrls.users.updateUser)

router.get('/show/:id', ctrls.users.showUser)


module.exports = router