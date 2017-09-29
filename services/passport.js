const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users'); // pull out user model class from mongoose

// make passport to use GoogleStrategy
passport.use(
	new GoogleStrategy(
		{
			clientID: keys.googleCLientID,
			clientSecret: keys.googleCLientSecret,
			callbackURL: '/auth/google/callback' // redirect to this url after authentication from google
		},
		// callback when accessToken is received from google
		(accessToken, refreshToken, profile, done) => {
			// console.log('access token', accessToken);
			// console.log('refresh token', refreshToken);
			// console.log('profile', profile);

			new User({ googleId: profile.id }).save(); // save model instance to mongodb
		}
	)
);
