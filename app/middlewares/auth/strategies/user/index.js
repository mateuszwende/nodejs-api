const { UserFacebookTokenStrategy } = require('./facebook-token');
const { UserJwtStrategy } = require('./jwt');
const { UserLocalStrategy } = require('./local');

module.exports = {
  UserFacebookTokenStrategy,
  UserJwtStrategy,
  UserLocalStrategy,
};
