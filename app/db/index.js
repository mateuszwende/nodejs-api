const mongoose = require('mongoose');

const uri = process.env === 'production' ? process.env.MONGODB_URI : 'mongodb://127.0.0.1:27017/bestbefore';

module.exports = {
  connect: () => mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }),

  close: () => mongoose.disconnect(),

  isConnected: () => mongoose.connection.readyState === 1,
};
