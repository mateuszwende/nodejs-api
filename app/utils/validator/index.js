const regexp = require('../regexp');

module.exports = {
  validateEmail: v => new Promise((res, rej) => {
    res(regexp.email.test(v));
  }),

  validatePassword: v => new Promise((res, rej) => {
    res(regexp.password.test(v));
  }),
};
