const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create a schema
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    mobile: {
        type: Number,
    },
    dob: {
        type: Date,
    },
    address: {
        type: String
    },
    state: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    register_date: {
        type: Date,
        default: Date.now
    }
})

module.exports = User = mongoose.model('user', UserSchema); 