const User = require('../../models/User');
const errors = require('../../utils/errors');

module.exports = {
  getAll: () => User.find({}).exec(),

  getByEmail: email => User.findOne({ email }).exec(),

  getById: id => User.findById(id).exec(),

  getByFacebookId: id => User.findOne({ 'facebook.id': id }).exec(),

  create: (email, password) => new User({
    methods: ['local'],
    email,
    password,
  }),

  createWithFacebook: (id, email) => new User({
    methods: ['facebook'],
    facebook: {
      id,
      email,
    },
  }),

  linkWithFacebook: (user, id, email) => {
    user.methods.push('facebook');
    user.facebook = {
      id,
      email,
    };

    return user.save();
  },

  update: (user, params) => {
    Object.keys(params).forEach((param) => {
      if (!user[param]) {
        throw errors.notValid(`${param} parameter`);
      }
      user[param] = params[param];
    });

    return user.save();
  },

  save: user => user.save(),

  verifyEmail: token => User.findOne({ emailToken: token }).exec(),

  delete: id => User.findByIdAndDelete(id).exec(),
};
