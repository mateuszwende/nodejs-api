const FacebookTokenStrategy = require('passport-facebook-token');
const callback = require('./callback');

module.exports = {
  UserFacebookTokenStrategy: () => new FacebookTokenStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      passReqToCallback: true,
    },
    callback,
  ),
};
