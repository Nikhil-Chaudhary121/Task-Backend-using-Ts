"use strict";
// import passport from 'passport';
// import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
// import User, { IUser } from '../model/user.model';
// import jwt from 'jsonwebtoken';
// import { PassportUser } from '../types/passport';
// import dotenv from 'dotenv';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// dotenv.config();
// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//       callbackURL:  process.env.GOOGLE_CALLBACK_URL,
//     },
//     async (_accessToken, _refreshToken, profile, done) => {
//       try {
//         if (!profile.emails || profile.emails.length === 0) {
//           throw new Error('No email found in Google profile');
//         }
//         const email = profile.emails[0].value;
//         // ✅ First, check if user exists by email
//         let user: IUser | null = await User.findOne({ email });
//         if (!user) {
//           // If not exists, create new user
//           user = await User.create({
//             name: profile.displayName || 'No Name',
//             email,
//             googleId: profile.id,
//           });
//         } else if (!user.googleId) {
//           // If user exists but doesn't have googleId yet → update it
//           user.googleId = profile.id;
//           await user.save();
//         }
//         // Create passport user object
//         const passportUser: PassportUser = {
//           user: {
//             _id: (user._id as unknown as { toString: () => string }).toString(),
//             name: user.name,
//             email: user.email,
//             googleId: user.googleId || '',
//           },
//           token: jwt.sign(
//             { id: (user._id as unknown as { toString: () => string }).toString() },
//             process.env.JWT_SECRET!,
//             { expiresIn: '7d' }
//           ),
//         };
//         done(null, passportUser);
//       } catch (err) {
//         done(err as Error, undefined);
//       }
//     }
//   )
// );
// passport.serializeUser((user: any, done) => done(null, user));
// passport.deserializeUser((obj: any, done) => done(null, obj));
// export default passport;
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const user_model_1 = __importDefault(require("../model/user.model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../config/env");
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: env_1.ENV.GOOGLE_CLIENT_ID,
    clientSecret: env_1.ENV.GOOGLE_CLIENT_SECRET,
    callbackURL: env_1.ENV.GOOGLE_CALLBACK_URL, // ✅ always defined
}, async (_accessToken, _refreshToken, profile, done) => {
    try {
        if (!profile.emails || profile.emails.length === 0) {
            throw new Error("No email found in Google profile");
        }
        const email = profile.emails[0].value;
        let user = await user_model_1.default.findOne({ email });
        if (!user) {
            user = await user_model_1.default.create({
                name: profile.displayName || "No Name",
                email,
                googleId: profile.id,
            });
        }
        else if (!user.googleId) {
            user.googleId = profile.id;
            await user.save();
        }
        const passportUser = {
            user: {
                _id: user._id.toString(),
                name: user.name,
                email: user.email,
                googleId: user.googleId || "",
            },
            token: jsonwebtoken_1.default.sign({ id: user._id.toString() }, env_1.ENV.JWT_SECRET, { expiresIn: "7d" }),
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
