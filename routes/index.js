const express = require('express');
const path = require('path');

const router = express.Router();

const connect = require('../schemas');
connect();
const Post = require('../schemas/post');

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/../public/index.html'));
});

router.get('/editor', (req, res) => {
    res.sendFile(path.join(__dirname, '/../public/editor.html'));
});

router.get('/editor/:id', (req, res) => {
    res.sendFile(path.join(__dirname, '/../public/editor.html'));
});

router.get('/content/:id', (req, res) => {
    res.sendFile(path.join(__dirname, '/../public/content.html'));
});

module.exports = router;