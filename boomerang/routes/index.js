const express = require('express')
const router = express.Router()
const passport = require('passport')
const db = require('../config/database')

// middleware to redirect oauth login/logout to referrer
const returnPath = (req, res, next) => {
    req.session.returnTo = req.originalUrl
    next()
}

// Root path redirect to /flights
router.get('/', returnPath, (req, res) => {
    const context = {
        user: req.user
    }

    res.render('index', context)
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
                res.redirect(req.session.returnTo)
            }
            
        })

    }
    );

// OAuth logout route
router.get('/logout', function(req, res){
    req.logout();
    res.redirect(req.session.returnTo);
});


module.exports = {
    index: router,
    questions: require('./questions'),
    users: require('./users')
}