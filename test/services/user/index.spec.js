const User = require("../../../app/models/User");
const { UserService } = require("../../../app/services");

const randomstring = require("randomstring");

describe("UserService", () => {
  describe(".getAll()", () => {
    it("it should get all users as an empty array", async () => {
      const users = await UserService.getAll();

      users.should.be.an("array");
      users.should.be.empty;
    });
  });

  describe(".gerById()", () => {
    it("it should not get user as null", async () => {
      const user = await UserService.getById(correctId);

      should.not.exist(user);
    });
  });

  describe(".getByEmail()", () => {
    it("it should get user as null", async () => {
      const user = await UserService.getByEmail(correctEmail);

      should.not.exist(user);
    });
  });

  describe(".create()", () => {
    it("it should create a new user", async () => {
      const user = await UserService.create(correctEmail, correctPassword);

      should.exist(user);
    });
  });

  describe(".save()", () => {
    it("it should save a user", async () => {
      const user = new User({
        methods: ["local"],
        email: correctEmail,
        password: correctPassword
      });

      const savedUser = await UserService.save(user);

      savedUser.should.be.a("object");
      savedUser.should.have.property("_id");
    });

    it("it not should save a user with wrong email", async () => {
      const user = new User({
        methods: ["local"],
        email: badEmail,
        password: correctPassword
      });

      try {
        await UserService.save(user);
      } catch (err) {
        err.should.have.property("errors").to.have.property("email");
      }
    });

    it("it not should save a user with wrong password", async () => {
      const user = new User({
        methods: ["local"],
        email: correctEmail,
        password: badPassword
      });
      let user1;
      try {
        user1 = await UserService.save(user);
      } catch (err) {
        err.should.have.property("errors").to.have.property("password");
      }
    });

    it("it not should save a user with wrong email and password", async () => {
      const user = new User({
        methods: ["local"],
        email: badEmail,
        password: badPassword
      });

      try {
        await UserService.save(user);
      } catch (err) {
        err.should.have.property("errors").to.have.property("email");
        err.should.have.property("errors").to.have.property("password");
      }
    });
  });

  describe(".verifyEmail()", () => {
    it("it should not verify a user which doesn't exist", async () => {
      const token = randomstring.generate();
      try {
        await UserService.verifyEmail(token);
      } catch (err) {
        err.should.exist;
      }
    });
  });

  describe(".delete()", () => {
    it("it should not delete a user which doesn't exist", async () => {
      try {
        await UserService.delete(correctId);
      } catch (err) {
        err.should.exist;
      }
    });
  });
});
