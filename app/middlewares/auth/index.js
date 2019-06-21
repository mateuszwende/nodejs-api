const passport = require('passport');
const { UserStrategy } = require('./strategies');

module.exports = {
  init: () => {
    passport.use('facebook-token-users', UserStrategy.UserFacebookTokenStrategy());
    passport.use('jwt-users', UserStrategy.UserJwtStrategy());
    passport.use('local-users', UserStrategy.UserLocalStrategy());
  },
};
