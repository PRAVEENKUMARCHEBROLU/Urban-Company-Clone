import dotenv from 'dotenv';
dotenv.config();
import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';

import User from '../models/User.js';
import jwt from 'jsonwebtoken';

passport.use (new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
    }, async (accessToken, refreshToken, profile, done) => {
        try {
        let user = await User.findOne({ email: profile.emails[0].value });
        if (!user) {
            user = new User({
            name: profile.displayName,
            email: profile.emails[0].value,
            password: null // Password is not used for Google auth
            });
            await user.save();
        }
        const token = jwt.sign({ user: { id: user.id } }, process.env.JWT_SECRET, { expiresIn: '1h' });
        done(null, { user, token });
        } catch (err) {
        console.error(err);
        done(err, null);
        }
    }));



