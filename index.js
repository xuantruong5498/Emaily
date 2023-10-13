const express = require('express');
const app = express ();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
passport.use(new GoogleStrategy());

// clientID 41817699578-ba4ccs3quh5uquuelppdthlud1ml7jc7.apps.googleusercontent.com
// ClientSecret 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

const PORT = process.env.PORT || 5000;
app.listen(5000);