const { UserJwtStrategy } = require('../../../../../../app/middlewares/auth/strategies/user/jwt');
const { UserService } = require('../../../../../../app/services');

describe('JWT STRATEGY', () => {
  // callback of the strategy callback
  const done = (err, user) => {
    if (err) {
      return err;
    }

    return user;
  };

  it('it should create local strategy', () => {
    const strategy = UserJwtStrategy();

    strategy.should.be.a('object');
    strategy.should.be.have.property('name').eql('jwt');
    strategy.should.be.have.property('_passReqToCallback').eql(true);
  });

  it('it should have an async callback', () => {
    const strategy = UserJwtStrategy();
    const callback = strategy._verify;

    callback[Symbol.toStringTag].should.be.equal('AsyncFunction');
  });

  it('it should return user by id specified in token', async () => {
    const strategy = UserJwtStrategy();
    const callback = strategy._verify;

    const user = await UserService.create(goodEmail, goodPassword);
    await UserService.save(user);

    const req = {};
    const payload = { sub: user.id };

    const res = await callback(req, payload, done);

    res.should.be.a('object');
    res.should.have.property('_id');
    res.should.have.property('email');
    res.should.have.property('password');
  });

  it('it should not return user by wrong id specified in token', async () => {
    const strategy = UserJwtStrategy();
    const callback = strategy._verify;

    const user = await UserService.create(goodEmail, goodPassword);
    await UserService.save(user);

    const req = {};
    const payload = { sub: goodId };

    const res = await callback(req, payload, done);

    res.should.be.an('Error');
  });

  it('it should not return user by totally random and wrong id specified in token', async () => {
    const strategy = UserJwtStrategy();
    const callback = strategy._verify;

    const user = await UserService.create(goodEmail, goodPassword);
    await UserService.save(user);

    const req = {};
    const payload = { sub: 1234 };

    const res = await callback(req, payload, done);

    res.should.be.a('object');
    res.should.have.property('name').eql('CastError');
  });
});
