var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    
    firstName: {
        type: String,
        default: ''
    },
    lastName: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        unique: true
    },
    dateOfBirth: {
        type: Date,
        default: ''
    },
    mobile: {
        type: Number,
        default: ''
    },
    status: {
        type: Boolean,
        required: true,
        default: 1
    },
    password: {
        type: String,
        required: true,
    },
    accountType: {
        type: String,
        default: ''
    },
});

var user = new mongoose.model('User', schema);

module.exports = user;