const mongoose = require('mongoose');
const uri = process.env.MONGODB_URI || 'mongodb://localhost/besbefore';

module.exports = {
    connect: async () => {
        try {
            await mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
        } catch (err) {
            throw err;
        }
    },

    close: async () => {
        try {
            await mongoose.disconnect();
        } catch (err) {
            throw err;
        }
    },

    isConnected: () => {
        return mongoose.connection.readyState === 1
    },

    dropModel: async (modelName) => {
        try {
            await models[modelName].deleteMany({});
        } catch (err) {
            throw err;
        }
    }
}
