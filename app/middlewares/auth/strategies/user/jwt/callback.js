const { UserService } = require('../../../../../services');
const commonErrors = require('../../../../../utils/errors/common');

module.exports = async (req, payload, done) => {
  try {
    // Find the user specified in token
    const user = await UserService.getById(payload.sub);

    // If user doesn't exists, handle it
    if (!user) {
      return done(commonErrors.unauthorized(), false);
    }

    // Otherwise, return the user
    req.user = user;
    return done(null, user);
  } catch (error) {
    return done(error, false);
  }
};
