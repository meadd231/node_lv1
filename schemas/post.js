const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    title: String,
    writer: String,
    password: String,
    content: String,
    createdAt : {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('posting', userSchema, 'posting');