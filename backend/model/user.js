const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ['user', 'admin'],
        default: 'user'
    },
    password: String
})

const User = mongoose.model('User', userSchema);

module.exports = User;