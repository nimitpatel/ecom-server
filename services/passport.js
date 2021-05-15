const passport = require('passport'),
    GoogleAuth = require('passport-google-oauth20').Strategy,
    jwt = require('jsonwebtoken'),
    mongoose = require('mongoose'),
    keys = require('../config/keys')

const User = mongoose.model('user');

passport.serializeUser((user, done) => {
    done(null, user.id)
});

passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            done(null, user)
        });
});

passport.use(new GoogleAuth(
    {
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback',
        proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
        const userExist = await User.findOne({ googleId: profile.id });

        if (userExist) {
            const token = jwt.sign(
                { googleId: profile.id, _id: userExist._id },
                keys.cookieKey,
                { expiresIn: '7d' }
            );
            const payload = { userExist, token }
            return done(null, payload);
        }

        const user = await new User({
            googleId: profile.id,
            email: profile.emails[0].value,
            name: profile.displayName,
            profile: profile.photos[0].value
        }).save();

        const token = jwt.sign(
            { googleId: profile.id, _id: user._id },
            keys.cookieKey,
            { expiresIn: '7d' }
        );
        const payload = { user, token }
        done(null, payload);
    }
));
