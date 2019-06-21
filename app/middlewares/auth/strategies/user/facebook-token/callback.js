const { UserService } = require('../../../../../services');
const commonErrors = require('../../../../../utils/errors/common');

module.exports = async (req, accessToken, refreshToken, profile, done) => {
  try {
    let user = (id = email = null);

    if (req && req.hasOwnProperty('user')) {
      user = req.user;
    }
    if (profile && profile.hasOwnProperty('id') && profile.hasOwnProperty('emails')) {
      id = profile.id;
      email = profile.emails[0].value;
    } else {
      throw commonErrors.notProvided('Facebook profile');
    }

    if (user) {
      // Link accounts
      user = await UserService.linkWithFacebook(user, id, email);

      return done(null, user);
    }

    let existingUser = await UserService.getByFacebookId(id);
    if (existingUser) {
      return done(null, existingUser);
    }

    // Check for same email
    existingUser = await UserService.getByEmail(email);

    if (existingUser) {
      existingUser = await UserService.linkWithFacebook(existingUser, id, email);

      return done(null, existingUser);
    }

    const newUser = UserService.createWithFacebook(id, email);
    await UserService.save(newUser);

    return done(null, newUser);
  } catch (err) {
    return done(err, false);
  }
};
