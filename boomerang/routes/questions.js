const express = require('express')
const router = express.Router()

// middleware added to get requests to return oauth authentication to referrer
const returnPath = require('../middleware/returnPath')
const authRequired = require('../middleware/authRequired')

const ctrls = require('../controllers')

// http://localhost:3000/questions

router.get('/new', authRequired, ctrls.questions.newQuestion)
router.post('/add', authRequired, ctrls.questions.addQuestion)
router.get('/show/:id', ctrls.questions.showQuestion)
router.post('/answers/add/:id', authRequired, ctrls.questions.addAnswer)




module.exports = router