const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    post_id: String,
    writer: String,
    password: String,
    content: String,
    createdAt : {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('comment', commentSchema, 'comment');