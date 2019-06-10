const debug = require("debug")("passport");
const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const { ExtractJwt } = require("passport-jwt");

const { UserService } = require("../../services");
const commonErrors = require("../../utils/errors/common");

// JSON WEB TOKENS STRATEGY
passport.use(
  "jwt-users",
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
      passReqToCallback: true
    },
    async (req, payload, done) => {
      try {
        // Find the user specified in token
        const user = await UserService.getById(payload.sub);

        // If user doesn't exists, handle it
        if (!user) {
          return done(commonErrors.notFound("User"), false);
        }

        // Otherwise, return the user
        req.user = user;
        done(null, user);
      } catch (error) {
        done(error, false);
      }
    }
  )
);

passport.use(
  "local-users",
  new LocalStrategy(
    {
      usernameField: "email"
    },
    async (email, password, done) => {
      try {
        const user = await UserService.getByEmail(email);

        if (!user) {
          return done(commonErrors.notFound("User"), false);
        }

        const isMatch = await user.checkPassword(password);

        if (!isMatch) {
          return done(null, false);
        }

        done(null, user);
      } catch (err) {
        done(err, false);
      }
    }
  )
);
