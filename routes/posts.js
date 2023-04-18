const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const multer = require('multer');
const upload = multer();

const router = express.Router();
router.use(bodyParser.json())
router.use(bodyParser.raw());
router.use(bodyParser.text());
router.use(bodyParser.urlencoded({ extended: true }));

const connect = require('../schemas');
connect();
const Post = require('../schemas/post');

router.post('/', async (req, res) => {
    const { title_give, writer_give, password_give, content_give } = req.body;
    console.log(req.body);
    const posting = new Post({
        title: title_give,
        writer: writer_give,
        password: password_give,
        content: content_give
    });
    try {
        await posting.save();
        console.log(a);
        res.json({ msg: '성공' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: '에러 발생' });
    }
});

router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        console.log(posts)
        res.json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: '에러 발생' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findOne({_id: req.params.id});
        console.log(post);
        res.json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: '에러 발생' });
    }
});

router.put('/', async (req, res) => {
    const { post_id, title_give, writer_give, password_give, content_give } = req.body;
    try {
        await Post.updateOne({_id: post_id}, {$set: {'title':title_give, 'writer':writer_give, 'password':password_give, 'content':content_give}});
        res.json({'msg' : '수정 완료'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: '에러 발생' });
    }
});

router.delete('/', upload.none(), async (req, res) => {
    const { post_id } = req.body;
    try {
        await Post.deleteOne({_id: post_id});
        res.json({'msg' : '삭제 완료'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: '에러 발생' });
    }
});

module.exports = router;