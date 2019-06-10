const controllers = require("../../app/controllers");

describe("CONTROLLERS", () => {
  it("it should have user controller attached", () => {
    controllers.should.have.property("UserController");
  });

  require("./user/index.spec.js");
});
