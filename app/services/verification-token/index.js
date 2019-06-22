const randomstring = require('randomstring');
const VerificationToken = require('../../models/VerificationToken');

module.exports = {
  create: userId => new VerificationToken({
    userId,
    token: randomstring.generate(),
  }),

  getByToken: token => VerificationToken.findOne({ token }).exec(),

  save: (verificationToken) => {
    verificationToken.save();
  },
};
