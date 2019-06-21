const { jwtSign } = require('../../../app/services/auth');

describe('AuthService', () => {
  describe('.jwtSign()', async () => {
    it('it should return a token from user id payload', async () => {
      const user = {
        id: 1234,
        data: 'example',
      };

      const token = await jwtSign(user.id);

      token.should.a('String');
    });

    it('it should not return a token from null payload', async () => {
      try {
        const res = await jwtSign(null);
      } catch (err) {
        err.should.be.an('error');
        err.should.have.property('status').eql(400);
      }
    });
  });
});
