const express = require('express')
const router = express.Router()
const passport = require('passport')
const db = require('../config/database')

// middleware to redirect oauth login/logout to referrer
const returnPath = require('../middleware/returnPath')
const authRequired = require('../middleware/authRequired')

// presentational for http://localhost:3000/
router.get('/', returnPath, (req, res) => {

    // code for filters
    const isEmpty = (object) => {
        return Object.keys(object).length === 0 && object.constructor === Object
    }

    const filter = {}
    if(req.query.search){
        filter.search = req.query.search
    }
    if(req.query.filterDate){
        filter.date = req.query.filterDate*-1
    }
    if(req.query.filterEngagement){
        filter.engagement = req.query.filterEngagement*-1
    }
    if(req.query.topic){
        filter.topic = req.query.topic
    }

    db.Question.find({}).sort({createdAt: 'desc'}).exec((err, foundQuestions) => {
        if(err) return console.log(err);

        const context = {
            user: req.user,
            questions: foundQuestions,
        }
        res.render('index', context)
    })
})

// Google OAuth login route
router.get('/auth/google', passport.authenticate(
    'google',
    { scope: ['profile', 'email'] }
));

// Google OAuth callback route
router.get('/oauth2callback', passport.authenticate(
    'google'), 
    (req, res) => {
        db.User.findById(req.session.passport.user, (err, foundUser) => {

            if(err) return console.log(err);

            if(!foundUser.username) {
                res.redirect('users/new')
            } else {

                if(req.session.returnTo) {
                    res.redirect(req.session.returnTo)
                } else {
                    res.redirect('/')
                }

            }
            
        })

    }
    );

// OAuth logout route
router.get('/logout', function(req, res){
    req.logout();

    if(req.session.returnTo) {
        res.redirect(req.session.returnTo)
    } else {
        res.redirect('/')
    }
    
});


module.exports = {
    index: router,
    questions: require('./questions'),
    users: require('./users'),
}