const jwt = require('jsonwebtoken');
const errors = require('../../utils/errors');

module.exports = {
  jwtSign: async (payload) => {
    let token;
    try {
      if (!payload) {
        throw errors.notProvided('Payload');
      }

      token = await jwt.sign(
        {
          iss: 'bb',
          sub: payload,
          iat: new Date().getTime(), // current time
          exp: new Date().setDate(new Date().getDate() + 20), // current time + 1 day ahead
        },
        process.env.JWT_SECRET,
      );
    } catch (err) {
      throw err;
    }
    return token;
  },
};
