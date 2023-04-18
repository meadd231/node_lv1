const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');


const router = express.Router();
router.use(bodyParser.json())
router.use(bodyParser.raw());
router.use(bodyParser.text());
router.use(bodyParser.urlencoded({ extended: true }));


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
        res.json({ msg: '게시글을 생성하였습니다.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: '데이터 형식이 올바르지 않습니다.' });
    }
});

router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        console.log(posts)
        res.json({"data": posts});
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: '에러 발생' });
    }
});

router.get('/:postId', async (req, res) => {
    try {
        const post = await Post.findOne({_id: req.params.postId});
        console.log(post);
        res.json({"data": post});
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: '에러 발생' });
    }
});

router.put('/:postId', async (req, res) => {
    const post_id = req.params.postId;
    const { title_give, writer_give, password_give, content_give } = req.body;
    try {
        await Post.updateOne({_id: post_id}, {$set: {'title':title_give, 'writer':writer_give, 'password':password_give, 'content':content_give}});
        res.json({'msg' : '게시글을 수정하였습니다.'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: '에러 발생' });
    }
});

router.delete('/:postId', async (req, res) => {
    const post_id = req.params.postId;
    try {
        await Post.deleteOne({_id: post_id});
        res.json({'msg' : '게시글을 삭제하였습니다.'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: '에러 발생' });
    }
});

module.exports = router;