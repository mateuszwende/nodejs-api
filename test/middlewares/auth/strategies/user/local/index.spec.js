const {
  UserLocalStrategy,
} = require('../../../../../../app/middlewares/auth/strategies/user/local');

describe('LOCAL STRATEGY', () => {
  it('it should create local strategy', () => {
    const strategy = UserLocalStrategy();

    strategy.should.be.a('object');
    strategy.should.be.have.property('name').eql('local');
    strategy.should.be.have.property('_usernameField');
    strategy.should.be.have.property('_passwordField');
  });

  it('it should have an async callback', () => {
    const strategy = UserLocalStrategy();
    const callback = strategy._verify;

    callback[Symbol.toStringTag].should.be.equal('AsyncFunction');
  });
});
