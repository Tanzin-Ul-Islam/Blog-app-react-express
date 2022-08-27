const mongoose = require('mongoose');
const users = require('./users');
const postSchema = mongoose.Schema({
    title: {
        type: String,
        unique: true,
        required: true,
    },
    description: {
        type: String,
        default: ""
    },
    image: {
        type: String,
        default: ""
    },
    authorId: {
        type: String,
        required: true,
        ref: 'users'
    },
    category: {
        type: String,
        required: true
    },
},
    { timestamps: true }
)

module.exports = mongoose.model('posts', postSchema);