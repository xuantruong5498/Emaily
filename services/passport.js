const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const moogoose = require('mongoose');
const keys = require('../config/keys.js');
const User = moogoose.model('user');
passport.serializeUser((user,done) => {
    done(null, user.id);
});
passport.deserializeUser((id,done) =>{
    User.findById(id).then(user => {
        done(null,user);
    });
});
passport.use(
    new GoogleStrategy(
        {
            clientID : keys.googleClientID,
            clientSecret : keys.googleClientSecret,
            callbackURL : '/auth/google/callback',
            proxy : true
        },
            (accessToken,refeshToken,profile,done) => 
            User.findOne({googleID : profile.id}).then(existingUser => {
                if(existingUser){
                    done(null,existingUser);
                }else  new User({googleID : profile.id })
                .save()
                .then(user => done(null,user)); 
            })
    )
);