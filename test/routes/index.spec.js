const routes = require('../../app/routes');

// HomeRoutes
// UserRoutes
// CustomerRoutes

describe('ROUTES', () => {
  it('it should all routes attached', () => {
    routes.stack.should.be.an('array');
    routes.stack.should.have.length(3);
  });

  require('./user/index.spec.js');
});
