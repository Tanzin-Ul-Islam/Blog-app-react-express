const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        default:""
    },
    password: {
        type: String,
        required: true,
    },
    profilePic: {
        type: String,
        default: ""
    },
    gender: {
        type: String,
        default: ""
    },
    address: {
        type: String,
        default: ""
    },
},
    { timestamps: true }
)

module.exports = mongoose.model('users', userSchema);