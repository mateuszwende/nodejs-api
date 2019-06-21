const { UserService } = require('../../../../../services');
const errors = require('../../../../../utils/errors');

module.exports = async (email, password, done) => {
  try {
    const user = await UserService.getByEmail(email);

    if (!user) {
      return done(errors.notFound('User'), false);
    }

    const isMatch = await user.checkPassword(password);

    if (!isMatch) {
      return done(null, false);
    }

    return done(null, user);
  } catch (err) {
    return done(err, false);
  }
};
