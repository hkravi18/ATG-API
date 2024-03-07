const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        regex: /^\S+@\S+\.\S+$/
    },
    password: {
        type: String,
        required: true,
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;