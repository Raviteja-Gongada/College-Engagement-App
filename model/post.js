const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    type:{
        type: String,
        required: true
    },
    description: {
        type: {},
        required: true
    },
    content: {
        type: {},
        required: true
    },
    author: {
        type: String,
    },
    email: {
        type: String,
    },
    date: {
        type: String,
    },
    upvote: Number,
    downvote: Number
});

module.exports = mongoose.model('post', postSchema)
