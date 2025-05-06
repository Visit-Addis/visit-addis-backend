import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import { envVar } from "../configs/env.vars.js";
import { User } from "../models/index.js";
import { CustomError, logError } from "../utils/index.js";

const googleAuthConfig = {
  clientID: envVar.google.clientId,
  clientSecret: envVar.google.clientSecret,
  callbackURL: `${envVar.serverUrl}/api/v1/auth/google/callback`,
  passReqToCallback: true,
};

const googleVerifyCallback = async (
  request,
  accessToken,
  refreshToken,
  profile,
  done
) => {
  try {
    const email = profile.emails[0].value;
    const userName = profile.displayName;
    const userImage = profile.picture;

    const user = await User.findOne({ email });
    if (user) {
      return done(null, user);
    } else {
      const newUser = await User.create({
        email,
        userName,
        password: null,
        isOAuthUser: true,
      });
      if (!newUser) {
        return done(new CustomError(400, "user creation failed", true), null);
      }
      return done(null, newUser);
    }
  } catch (error) {
    logError(error);
    return done(error, null);
  }
};

const googleStrategy = new GoogleStrategy(
  googleAuthConfig,
  googleVerifyCallback
);
passport.use(googleStrategy);
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  await User.findById(id, (err, user) => {
    done(err, user);
  });
});

export default passport;
