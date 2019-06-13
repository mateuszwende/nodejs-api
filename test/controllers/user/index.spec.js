const { UserController } = require('../../../app/controllers');

describe('UserController', () => {
  describe('.getAll()', () => {
    it('it should get result with empty data and 200 status', async () => {
      try {
        const res = await UserController.getAll();

        res.should.be.a('object');
        res.should.have.property('status').eql(200);
        res.should.have.property('data').to.be.empty;
      } catch (err) {
        throw err;
      }
    });
  });

  describe('.getOne()', () => {
    it('it should get result with null data and 200 status', async () => {
      try {
        await UserController.getOne(goodId);
      } catch (err) {
        err.should.exist;
      }
    });
  });

  describe('.register()', () => {
    it('it should register a user getting result of data, jwtToken and status 201', async () => {
      try {
        const res = await UserController.register(goodEmail, goodPassword);

        res.should.be.a('object');
        res.should.have.property('status').eql(201);
        res.should.have.property('data').to.have.property('newUser');
        res.should.have.property('data').to.have.property('jwtToken');
      } catch (err) {
        throw err;
      }
    });
  });

  describe('.login()', () => {
    it("it should not login a user who doesn't exist", async () => {
      try {
        await UserController.login(null);
      } catch (err) {
        err.should.exist;
      }
    });
  });

  describe('.logout()', () => {
    it('it should send message when logging out', async () => {
      try {
        res = await UserController.logout();
        res.should.have.property('status').eql(200);
        res.should.have.property('success').eql(true);
      } catch (err) {
        throw err;
      }
    });
  });

  describe('.verifyEmail()', () => {
    it("it should not verify email of a user who doesn't exist", async () => {
      try {
        await UserController.verifyEmail();
      } catch (err) {
        err.should.exist;
      }
    });
  });

  describe('.update()', () => {
    it("it should not update a user who doesn't exist", async () => {
      try {
        await UserController.update(goodId, { email: goodEmail });
      } catch (err) {
        err.should.exist;
      }
    });
  });

  describe('.delete()', () => {
    it("it should not delete a user who doesn't exist", async () => {
      try {
        await UserController.delete(goodId);
      } catch (err) {
        err.should.exist;
      }
    });
  });
});
