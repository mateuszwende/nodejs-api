const services = require("../../app/services");

describe("SERVICES", () => {
  it("it should have user service attached", () => {
    services.should.have.property("UserService");
  });

  require("./user/index.spec.js");
  require("./mailer/index.spec.js");
});
