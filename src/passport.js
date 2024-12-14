import passport from 'passport';
import User from './models/User.js'; // Adjust the path as necessary
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import dotenv from 'dotenv';
dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.URL_API}/api/auth/google/callback`,
    },
    async function (accessToken, refreshToken, profile, cb) {
      try {
        if (profile?.id) {
          let user = await User.findOne({ googleId: profile.id});
          
          if (!user) {
            user = new User({      
              googleId: profile.id,
              email: profile.emails[0]?.value,
              userName: profile?.displayName,
            });
            await user.save();
            
          }
        }
        return cb(null, profile);
      } catch (error) {
        return cb(error, null);
      }
    }
  )
);




