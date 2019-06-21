const LocalStrategy = require('passport-local').Strategy;
const callback = require('./callback');

module.exports = {
  UserLocalStrategy: () => new LocalStrategy(
    {
      usernameField: 'email',
    },
    callback,
  ),
};
