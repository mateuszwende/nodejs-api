const jwt = require("jsonwebtoken");
const passport = require("passport");

// const LocalStrategy = require("passport-local").Strategy;

// const passportSignIn = passport.authenticate("local", { session: false });
// const passportJWT = passport.authenticate("jwt", { session: false });
// const GooglePlusTokenStrategy = require("passport-google-plus-token");
// const FacebookTokenStrategy = require("passport-facebook-token");

module.exports = {
  jwtSign: async payload => {
    let token;
    try {
      // token = await jwt.sign(payload, privateKey, options);
      token = await jwt.sign(
        {
          iss: "bestbefore",
          sub: payload.id,
          iat: new Date().getTime(), // current time
          exp: new Date().setDate(new Date().getDate() + 20) // current time + 1 day ahead
        },
        process.env.JWT_SECRET
      );
    } catch (err) {
      throw err;
    }
    return token;
  }
};
