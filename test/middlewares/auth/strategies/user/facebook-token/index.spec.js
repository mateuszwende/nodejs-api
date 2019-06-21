const {
  UserFacebookTokenStrategy,
} = require('../../../../../../app/middlewares/auth/strategies/user/facebook-token');
const { UserService } = require('../../../../../../app/services');

chai.use(require('chai-passport-strategy'));

describe('FACEBOOK TOKEN STRATEGY', () => {
  // callback of the strategy callback
  const done = (err, user) => {
    if (err) {
      return err;
    }

    return user;
  };

  it('it should create local strategy', () => {
    const strategy = UserFacebookTokenStrategy();

    strategy.should.be.a('object');
    strategy.should.be.have.property('name').eql('facebook-token');
    strategy.should.be.have.property('_accessTokenField').eql('access_token');
    strategy.should.be.have.property('_oauth2');
    strategy._oauth2.should.be.have.property('_clientId').eql(process.env.FACEBOOK_APP_ID);
    strategy._oauth2.should.be.have.property('_clientSecret').eql(process.env.FACEBOOK_APP_SECRET);
    strategy.should.be.have.property('_passReqToCallback').eql(true);
  });

  it('it should have an async callback', () => {
    const strategy = UserFacebookTokenStrategy();
    const callback = strategy._verify;

    callback[Symbol.toStringTag].should.be.equal('AsyncFunction');
  });

  it('it should return an existing user linked with facebook id after being given that user', async () => {
    try {
      const strategy = UserFacebookTokenStrategy();
      const callback = strategy._verify;

      const user = await UserService.create(goodEmail, goodPassword);
      await UserService.save(user);

      const req = { user };
      const profile = {
        id: 1234,
        emails: [{ value: 'example@gmail.com ' }],
      };

      linkedUser = await callback(req, null, null, profile, done);

      should.exist(linkedUser);
      linkedUser.should.have.property('facebook').to.have.property('id');
      linkedUser.should.have.property('facebook').to.have.property('email');
    } catch (err) {
      throw err;
    }
  });

  it('it should return an existing user with facebook id', async () => {
    try {
      const strategy = UserFacebookTokenStrategy();
      const callback = strategy._verify;

      const facebookUserId = 1234;

      const user = await UserService.create(goodEmail, goodPassword);
      user.facebook = {
        id: facebookUserId,
        email: goodEmail,
      };
      await UserService.save(user);

      const req = { user };
      const profile = {
        id: facebookUserId,
        emails: [{ value: 'example@gmail.com' }],
      };

      existingUser = await callback(req, null, null, profile, done);

      should.exist(existingUser);
      existingUser.should.have.property('facebook').to.have.property('id');
      existingUser.should.have.property('facebook').to.have.property('email');
    } catch (err) {
      throw err;
    }
  });

  it('it should return an existing user linked to facebook id by an email', async () => {
    try {
      const strategy = UserFacebookTokenStrategy();
      const callback = strategy._verify;

      const req = null;
      const profile = {
        id: 1234,
        emails: [{ value: goodEmail }],
      };

      linkedUser = await callback(req, null, null, profile, done);

      should.exist(linkedUser);
      linkedUser.should.have.property('facebook').to.have.property('id');
      linkedUser.should.have.property('facebook').to.have.property('email');
    } catch (err) {
      throw err;
    }
  });

  it('it should return a new user linked to facebook id', async () => {
    try {
      const strategy = UserFacebookTokenStrategy();
      const callback = strategy._verify;

      const req = null;
      const profile = {
        id: 1234,
        emails: [{ value: goodEmail }],
      };

      newUser = await callback(req, null, null, profile, done);

      should.exist(newUser);
      newUser.should.have.property('facebook').to.have.property('id');
      newUser.should.have.property('facebook').to.have.property('email');
    } catch (err) {
      throw err;
    }
  });

  it('it should return error if profile is null', async () => {
    try {
      const strategy = UserFacebookTokenStrategy();
      const callback = strategy._verify;

      const req = null;
      const profile = null;

      res = await callback(req, null, null, profile, done);

      res.should.be.an('Error');
    } catch (err) {
      throw err;
    }
  });
});
