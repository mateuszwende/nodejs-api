const errors = require('../../../app/utils/errors');

describe('errors', () => {
  describe('.alreadyExists()', () => {
    it('it should return an Error with status equal 400', () => {
      const err = errors.alreadyExists('item');

      err.should.be.an('Error');
      err.should.have.property('status').eql(400);
    });
  });

  describe('.alreadyVerified()', () => {
    it('it should return an Error with status equal 400', () => {
      const err = errors.alreadyVerified('item');

      err.should.be.an('Error');
      err.should.have.property('status').eql(400);
    });
  });

  describe('.deleteFail()', () => {
    it('it should return an Error with status equal 400', () => {
      const err = errors.deleteFail('item');

      err.should.be.an('Error');
      err.should.have.property('status').eql(400);
    });
  });

  describe('.isRequired()', () => {
    it('it should return an Error with status equal 400', () => {
      const err = errors.isRequired('item');

      err.should.be.an('Error');
      err.should.have.property('status').eql(400);
    });
  });

  describe('.notFound()', () => {
    it('it should return an Error with status equal 404', () => {
      const err = errors.notFound('item');

      err.should.be.an('Error');
      err.should.have.property('status').eql(404);
    });
  });

  describe('.notValid()', () => {
    it('it should return an Error with status equal 400', () => {
      const err = errors.notValid('item');

      err.should.be.an('Error');
      err.should.have.property('status').eql(400);
    });
  });

  describe('.notValidRoute()', () => {
    it('it should return an Error with status equal 404', () => {
      const err = errors.notValidRoute();

      err.should.be.an('Error');
      err.should.have.property('status').eql(404);
    });
  });

  describe('.notProvided()', () => {
    it('it should return an Error with status equal 400', () => {
      const err = errors.notProvided();

      err.should.be.an('Error');
      err.should.have.property('status').eql(400);
    });
  });

  describe('.unauthorized()', () => {
    it('it should return an Error with status equal 403', () => {
      const err = errors.unauthorized();

      err.should.be.an('Error');
      err.should.have.property('status').eql(403);
    });
  });

  describe('.wrongCredentials()', () => {
    it('it should return an Error with status equal 400', () => {
      const err = errors.wrongCredentials();

      err.should.be.an('Error');
      err.should.have.property('status').eql(400);
    });
  });
});
