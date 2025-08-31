import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User, { IUser } from '../model/user.model';
import jwt from 'jsonwebtoken';
import { PassportUser } from '../types/passport';
import dotenv from 'dotenv';

dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: '/api/auth/google/callback',
    },
    async (_accessToken, _refreshToken, profile, done) => {
      try {
        if (!profile.emails || profile.emails.length === 0) {
          throw new Error('No email found in Google profile');
        }

        const email = profile.emails[0].value;

        // ✅ First, check if user exists by email
        let user: IUser | null = await User.findOne({ email });

        if (!user) {
          // If not exists, create new user
          user = await User.create({
            name: profile.displayName || 'No Name',
            email,
            googleId: profile.id,
          });
        } else if (!user.googleId) {
          // If user exists but doesn't have googleId yet → update it
          user.googleId = profile.id;
          await user.save();
        }

        // Create passport user object
        const passportUser: PassportUser = {
          user: {
            _id: (user._id as unknown as { toString: () => string }).toString(),
            name: user.name,
            email: user.email,
            googleId: user.googleId || '',
          },
          token: jwt.sign(
            { id: (user._id as unknown as { toString: () => string }).toString() },
            process.env.JWT_SECRET!,
            { expiresIn: '7d' }
          ),
        };

        done(null, passportUser);
      } catch (err) {
        done(err as Error, undefined);
      }
    }
  )
);

passport.serializeUser((user: any, done) => done(null, user));
passport.deserializeUser((obj: any, done) => done(null, obj));

export default passport;
