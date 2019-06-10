'use strict';

const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');

const customerTypes = ['Shop', 'Restaurant', 'Cafe', 'Bakery']

const CustomerSchema = new mongoose.Schema({
    type: {
        type: String,
        required: [true, 'Type is required.'],
        enum: customerTypes
    },
    ownerFirstName: {
        type: String,
        trim: true,
        required: true,
    },
    ownerLastName: {
        type: String,
        trim: true,
        required: true,
    },
    companyName: {
        type: String,
        trim: true,
        required: true,
    },
    areaCode: {
        type: String,
        trim: true,
        required: true
    },
    phoneNumber: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        required: true,
    },
    address: {
        street: {
            type: String,
            trim: true,
            required: true
        },
        streetNumber: {
            type: Number,
            trim: true,
            required: true
        },
        city: {
            type: String,
            trim: true,
            required: true
        },
        postal: {
            type: String,
            trim: true,
            required: true
        },

    },
    country: {
        type: String,
        trim: true,
        required: true
    }
});

CustomerSchema.plugin(timestamp);

module.exports = mongoose.model('Customer', CustomerSchema);
