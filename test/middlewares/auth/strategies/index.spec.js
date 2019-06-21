const strategies = require('../../../../app/middlewares/auth/strategies');

describe('STRATEGIES', () => {
  it('it should contain 1 strategy', () => {
    strategies.should.be.a('object');
    Object.keys(strategies).should.have.lengthOf(1);
  });

  require('./user/index.spec.js');
});
