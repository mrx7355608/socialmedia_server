import passport from "passport";
import { Strategy } from "passport-local";
import usersDB from "./data/user.data.js";

export default function passportStrategySetup() {
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
