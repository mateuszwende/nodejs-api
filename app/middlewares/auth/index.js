const errors = require("../../utils/errors");
// const config = require("../../../config");
const jwt = require("jsonwebtoken");

module.exports = {
  checkJwt: (req, res, next) => {
    const token = req.headers["access-token"];

    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          throw errors.notValid("Token");
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      throw errors.notProvided("Token");
    }
  }
};
