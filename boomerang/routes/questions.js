const express = require('express')
const router = express.Router()

// middleware added to get requests to return oauth authentication to referrer
const returnPath = (req, res, next) => {
    req.session.returnTo = req.originalUrl
    next()
}

const ctrls = require('../controllers')

// http://localhost:3000/questions

router.get('/new', ctrls.questions.newQuestion)
router.post('/add', ctrls.questions.createQuestion)
router.get('/show/:id', ctrls.questions.showQuestion)
router.post('/answers/add/:id', ctrls.questions.addAnswer)




module.exports = router