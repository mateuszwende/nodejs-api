const services = require('../../app/services');

describe('SERVICES', () => {
  it('it should have user service attached', () => {
    services.should.have.property('UserService');
  });

  require('./auth/index.spec');
  require('./user/index.spec');
});
