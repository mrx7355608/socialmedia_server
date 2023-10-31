import passport from "passport";
import { Strategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import usersDB from "./data/user.data.js";

export default function passportStrategySetup() {
  // Local auth
  passport.use(
    new Strategy({ usernameField: "email" }, async (email, password, done) => {
      try {
        const user = await usersDB.findByEmail(email);
        if (!user) {
          return done(null, false);
        }

        const isValidPassword = await user.verifyPassword(password);
        if (isValidPassword === false) {
          return done(null, true, { message: "Incorrect email or password" });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    })
  );

  // Google auth
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
  }, async (accessToken, refreshToken, profile, cb) => {
    // TODO: Modify this whole code block using "UPSERT"
    // in mongodb

    // Find the existing user with google account
    const existingUser = await usersDB.findByGoogleID(profile.id);
    if (existingUser) {
      return cb(null, existingUser);
    }
    // If user does not exist, then
    // Create a new user with google account
    const data = {};
    const newGoogleUser = await usersDB.insert(data);
    return cb(null, newGoogleUser);
  }));

  passport.serializeUser((user, done) => done(null, user.id));

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await usersDB.findById(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
}
