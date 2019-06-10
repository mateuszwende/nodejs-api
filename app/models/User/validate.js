const { emailRegex, passwordRegex } = require('../../utils/Regexp');

module.exports = {
    validateEmail: (v) => {
        return new Promise((res, rej) => {
            res(emailRegex.test(v));
        })
    },

    validatePassword: (v) => {
        return new Promise((res, rej) => {
            res(passwordRegex.test(v));
        })
    },
}