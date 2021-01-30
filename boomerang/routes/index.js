const express = require('express')
const router = express.Router()
const passport = require('passport')

// Root path redirect to /flights
router.get('/', (req, res) => {
    res.render('index')
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
        console.log(`Return path: ${req.session.returnTo}`);
        res.redirect(req.session.returnTo)
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