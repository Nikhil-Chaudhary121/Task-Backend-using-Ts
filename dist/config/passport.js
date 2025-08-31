"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const user_model_1 = __importDefault(require("../model/user.model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/api/auth/google/callback',
}, async (_accessToken, _refreshToken, profile, done) => {
    try {
        if (!profile.emails || profile.emails.length === 0) {
            throw new Error('No email found in Google profile');
        }
        const email = profile.emails[0].value;
        // ✅ First, check if user exists by email
        let user = await user_model_1.default.findOne({ email });
        if (!user) {
            // If not exists, create new user
            user = await user_model_1.default.create({
                name: profile.displayName || 'No Name',
                email,
                googleId: profile.id,
            });
        }
        else if (!user.googleId) {
            // If user exists but doesn't have googleId yet → update it
            user.googleId = profile.id;
            await user.save();
        }
        // Create passport user object
        const passportUser = {
            user: {
                _id: user._id.toString(),
                name: user.name,
                email: user.email,
                googleId: user.googleId || '',
            },
            token: jsonwebtoken_1.default.sign({ id: user._id.toString() }, process.env.JWT_SECRET, { expiresIn: '7d' }),
        };
        done(null, passportUser);
    }
    catch (err) {
        done(err, undefined);
    }
}));
passport_1.default.serializeUser((user, done) => done(null, user));
passport_1.default.deserializeUser((obj, done) => done(null, obj));
exports.default = passport_1.default;
