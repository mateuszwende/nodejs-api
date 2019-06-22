const { UserService, VerificationTokenService } = require('../../../app/services');

const route = '/api/users';

describe('UserRoutes', () => {
  describe(`GET ${route}`, async () => {
    it('it should get all the users (1)', async () => {
      const user = await UserService.create(goodEmail, goodPassword);
      await UserService.save(user);

      const res = await chai.request(server).get(`${route}`);

      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.property('success').eql(true);
      res.body.should.have.property('data').to.have.lengthOf(1);
    });

    it('it should get all the users as object with empty array', async () => {
      const res = await chai.request(server).get(`${route}`);

      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.property('status').eql(200);
      res.body.should.have.property('data').to.be.empty;
    });
  });

  describe(`GET ${route}/:id`, () => {
    it('it should get a user', async () => {
      const user = await UserService.create(goodEmail, goodPassword);
      await UserService.save(user);

      const res = await chai.request(server).get(`${route}/${user._id}`);

      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.property('success').eql(true);
      res.body.should.have.property('data').to.have.property('_id');
      res.body.should.have.property('data').to.have.property('isVerified');
      res.body.should.have.property('status').eql(200);
    });

    it("it should not get a user who doesn't exist", async () => {
      const res = await chai.request(server).get(`${route}/${goodId}`);

      res.should.have.status(404);
      res.body.should.be.a('object');
      res.body.should.have.property('status').eql(404);
      res.body.should.have.property('error').to.have.property('message');
    });
  });

  describe(`POST ${route}/register`, () => {
    it('it should register a new user', async () => {
      const user = {
        email: goodEmail,
        password: goodPassword,
      };
      const res = await chai
        .request(server)
        .post(`${route}/register`)
        .send({ email: user.email, password: user.password });

      res.should.have.status(201);
      res.body.should.be.a('object');
      res.body.should.have.property('status').eql(201);
      res.body.should.have.property('success').eql(true);
      res.body.should.have.property('data').to.have.property('newUser');
      res.body.data.newUser.should.have.property('isVerified').eql(false);
      res.body.data.newUser.should.have.property('_id');
      res.body.data.should.have.property('jwtToken');
    });

    it('it should not register a new user when the user already exist', async () => {
      const user = UserService.create(goodEmail, goodPassword);
      await UserService.save(user);

      const res = await chai
        .request(server)
        .post(`${route}/register`)
        .send(user);

      res.should.have.status(400);
      res.body.should.be.a('object');
      res.body.should.have.property('status').eql(400);
      res.body.should.have.property('error').to.have.property('message');
    });

    it('it should not register a new user without email', async () => {
      const user = {
        password: goodPassword,
      };
      const res = await chai
        .request(server)
        .post(`${route}/register`)
        .send(user);

      res.should.have.status(400);
      res.body.should.be.a('object');
      res.body.should.have.property('status').eql(400);
      res.body.should.have.property('error').to.have.property('message');
    });

    it('it should not register a new user without password', async () => {
      const user = {
        email: goodEmail,
      };
      const res = await chai
        .request(server)
        .post(`${route}/register`)
        .send(user);

      res.should.have.status(400);
      res.body.should.be.a('object');
      res.body.should.have.property('status').eql(400);
      res.body.should.have.property('error').to.have.property('message');
    });

    it('it should not register a new user with wrong email', async () => {
      const user = {
        email: badEmail,
        password: goodPassword,
      };
      const res = await chai
        .request(server)
        .post(`${route}/register`)
        .send(user);

      res.should.have.status(400);
      res.body.should.be.a('object');
      res.body.should.have.property('status').eql(400);
      res.body.should.have
        .property('error')
        .to.have.property('email')
        .to.have.property('message');
    });

    it('it should not register a new user with wrong password', async () => {
      const user = {
        email: goodEmail,
        password: badPassword,
      };
      const res = await chai
        .request(server)
        .post(`${route}/register`)
        .send(user);

      res.should.have.status(400);
      res.body.should.be.a('object');
      res.body.should.have.property('status').eql(400);
      res.body.should.have
        .property('error')
        .to.have.property('password')
        .to.have.property('message');
    });

    it('it should not register a new user with wrong email and password', async () => {
      const user = {
        email: badEmail,
        password: badPassword,
      };
      const res = await chai
        .request(server)
        .post(`${route}/register`)
        .send(user);

      res.should.have.status(400);
      res.body.should.be.a('object');
      res.body.should.have.property('status').eql(400);
      res.body.should.have
        .property('error')
        .to.have.property('email')
        .to.have.property('message');
      res.body.should.have
        .property('error')
        .to.have.property('password')
        .to.have.property('message');
    });
  });

  describe(`GET ${route}/verify-email`, () => {
    it('it should verify a user', async () => {
      const user = await UserService.create(goodEmail, goodPassword);
      await UserService.save(user);

      verificationToken = VerificationTokenService.create(user.id);
      await VerificationTokenService.save(verificationToken);

      const res = await chai
        .request(server)
        .get(`${route}/verify-email`)
        .query({ token: verificationToken.token });

      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.property('status').eql(200);
    });

    it("it should not verify a user who doesn't exist", async () => {
      const res = await chai
        .request(server)
        .get(`${route}/verify-email`)
        .query({ token: goodEmailToken });

      res.should.have.status(404);
      res.body.should.be.a('object');
      res.body.should.have.property('status').eql(404);
      res.body.should.have.property('error').to.have.property('message');
    });

    it('it should not verify a new user without token', async () => {
      const res = await chai.request(server).get(`${route}/verify-email`);

      res.should.have.status(400);
      res.body.should.be.a('object');
      res.body.should.have.property('status').eql(400);
      res.body.should.have.property('error').to.have.property('message');
    });
  });

  describe(`POST ${route}/login`, () => {
    it('it should login an existing user', async () => {
      const user = await UserService.create(goodEmail, goodPassword);
      await UserService.save(user);

      const res = await chai
        .request(server)
        .post(`${route}/login`)
        .send({ email: goodEmail, password: goodPassword });

      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.property('status').eql(200);
      res.body.should.have.property('data').to.have.property('jwtToken');
    });

    it("it should not login user who doesn't exist", async () => {
      const user = {
        email: goodEmail,
        password: goodPassword,
      };

      const res = await chai
        .request(server)
        .post(`${route}/login`)
        .send(user);

      res.should.have.status(404);
      res.body.should.be.a('object');
      res.body.should.have.property('status').eql(404);
      res.body.should.have.property('error').to.have.property('message');
    });
  });

  describe(`PUT ${route}/update/:id`, () => {
    it('it should update an existing user', async () => {
      const user = await UserService.create(goodEmail, goodPassword);
      await UserService.save(user);

      const res = await chai
        .request(server)
        .put(`${route}/update/${user.id}`)
        .send({
          params: { email: goodEmail, password: goodPassword },
        });

      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.property('status').eql(200);
      res.body.should.have.property('data').to.have.property('_id');
      res.body.should.have.property('success').eql(true);
    });

    it("it should not update user who doesn't exist", async () => {
      const res = await chai
        .request(server)
        .put(`${route}/update/${goodId}`)
        .send({
          params: { email: goodEmail, password: goodPassword },
        });

      res.should.have.status(404);
      res.body.should.be.a('object');
      res.body.should.have.property('status').eql(404);
      res.body.should.have.property('error').to.have.property('message');
    });

    it('it should not update user when provided wrong email', async () => {
      const user = await UserService.create(goodEmail, goodPassword);
      await UserService.save(user);

      setTimeout(() => {}, 1000);

      const res = await chai
        .request(server)
        .put(`${route}/update/${user.id}`)
        .send({
          params: { email: badEmail, password: goodPassword },
        });

      res.should.have.status(400);
      res.body.should.be.a('object');
      res.body.should.have.property('status').eql(400);
      res.body.should.have.property('error').to.have.property('email');
    });
  });

  describe(`POST ${route}/delete/:id`, () => {
    it('should delete an existing user', async () => {
      const user = await UserService.create(goodEmail, goodPassword);
      await UserService.save(user);

      const res = await chai.request(server).post(`${route}/delete/${user.id}`);

      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.property('status').eql(200);
      res.body.should.have.property('success').eql(true);
    });

    it("should not delete user who doesn't exist", async () => {
      const res = await chai.request(server).post(`${route}/delete/${goodId}`);

      res.should.have.status(400);
      res.body.should.be.a('object');
      res.body.should.have.property('status').eql(400);
      res.body.should.have.property('error').to.have.property('message');
    });
  });
});
