"use strict";
const User = require("../../models/User");
const randomstring = require("randomstring");

module.exports = {
  getAll: () => {
    return User.find({}).exec();
  },

  getByEmail: email => {
    return User.findOne({ email: email }).exec();
  },

  getById: id => {
    return User.findById(id).exec();
  },

  create: (email, password) => {
    return new User({
      methods: ["local"],
      email: email,
      password: password
    });
  },

  save: user => {
    return user.save();
  },

  verifyEmail: token => {
    return User.findOne({ emailToken: token }).exec();
  },

  delete: async id => {
    return User.findByIdAndDelete(id).exec();
  },

  generateEmailToken: () => {
    return randomstring.generate();
  }
};
