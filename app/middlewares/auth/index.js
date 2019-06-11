const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const FacebookTokenStrategy = require('passport-facebook-token');
const LocalStrategy = require('passport-local').Strategy;

const { ExtractJwt } = require('passport-jwt');

const { UserService } = require('../../services');
const commonErrors = require('../../utils/errors/common');

module.exports = {
  init: () => {
    // JSON WEB TOKENS STRATEGY
    console.log('INIT JWT SECRET', process.env.JWT_SECRET);

    passport.use(
      'jwt-users',
      new JwtStrategy(
        {
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
          secretOrKey: process.env.JWT_SECRET,
          passReqToCallback: true,
        },
        async (req, payload, done) => {
          try {
            // Find the user specified in token
            const user = await UserService.getById(payload.sub);

            // If user doesn't exists, handle it
            if (!user) {
              return done(commonErrors.notFound('User'), false);
            }

            // Otherwise, return the user
            req.user = user;
            return done(null, user);
          } catch (error) {
            return done(error, false);
          }
        },
      ),
    );

    passport.use(
      'facebook-token-users',
      new FacebookTokenStrategy(
        {
          clientID: process.env.FACEBOOK_APP_ID,
          clientSecret: process.env.FACEBOOK_APP_SECRET,
          passReqToCallback,
        },
        async (req, accessToken, refreshToken, profile, done) => {
          try {
            if (req.user) {
              // Link accounts
              req.user.methods.push('facebook');
              req.user.facebook = {
                id: profile.id,
                email: profile.emails[0].value,
              };

              await UserService.save(req.user);
              return done(null, req.user);
            }
            // Creating account proccess
            let existingUser = await UserService.getByFacebookId(profile.id);

            if (existingUser) {
              return done(null, existingUser);
            }

            // Check for same email
            existingUser = await UserService.getByEmail(profile.emails[0].value);

            if (existingUser) {
              existingUser.methods.push('facebook');
              existingUser.facebook = {
                id: profile.id,
                email: profile.emails[0].value,
              };

              await UserService.save(existingUser);
              return done(null, existingUser);
            }

            const newUser = newUser({
              methods: ['facebook'],
              facebook: {
                id: profile.id,
                email: profile.emails[0].value,
              },
            });

            await UserService.save(newUser);
            return done(null, newUser);
          } catch (err) {
            return done(err, false);
          }
        },
      ),
    );

    passport.use(
      'local-users',
      new LocalStrategy(
        {
          usernameField: 'email',
        },
        async (email, password, done) => {
          try {
            const user = await UserService.getByEmail(email);

            if (!user) {
              return done(commonErrors.notFound('User'), false);
            }

            const isMatch = await user.checkPassword(password);

            if (!isMatch) {
              return done(null, false);
            }

            return done(null, user);
          } catch (err) {
            return done(err, false);
          }
        },
      ),
    );
  },
};
