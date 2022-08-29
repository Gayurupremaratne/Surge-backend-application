var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    userID: {
        type: String,
        
    },
    createdDate: {
        type: Date,
       
    }
});

var note = new mongoose.model('Note', schema);

module.exports = note;