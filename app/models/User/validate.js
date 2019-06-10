const { emailRegex, passwordRegex } = require('../../utils/Regexp');

module.exports = {
  validateEmail: v => new Promise((res, rej) => {
    res(emailRegex.test(v));
  }),

  validatePassword: v => new Promise((res, rej) => {
    res(passwordRegex.test(v));
  }),
};
