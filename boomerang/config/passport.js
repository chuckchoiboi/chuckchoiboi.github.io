const passport = require('passport')

const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const User = require('../models/User')

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
  },
  function(accessToken, refreshToken, profile, cb) {
    
    User.findOne({ 'googleId': profile.id }, (err, user) => {
      
      if (err) return cb(err);

      if (user) {
        return cb(null, user);
      } else {

        User.findOne({
          email: profile.emails[0].value,
        }, (err, foundUser) => {
          if(err) return console.log(err);
          if(foundUser) {
            res.redirect('/auth/google')
          } else {
            const newUser = new User({
            email: profile.emails[0].value,
            googleId: profile.id,
            avatarUrl: profile._json.picture,
            });
            newUser.save(function(err) {
              if (err) return cb(err);
              return cb(null, newUser);
            });
          }
        })

      }
    });
  }

));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});