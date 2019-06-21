const UserStrategy = require('../../../../../app/middlewares/auth/strategies/user');

describe('USER', () => {
  it('it should have 3 strategies linked', () => {
    UserStrategy.should.be.a('object');
    Object.keys(UserStrategy).should.have.lengthOf(3);
  });

  require('./facebook-token/index.spec.js');
  require('./jwt/index.spec.js');
  require('./local/index.spec.js');
});
