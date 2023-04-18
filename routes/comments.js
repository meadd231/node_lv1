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
const Comment = require('../schemas/comment');

router.post('/', upload.none(), async (req, res) => {
    const { post_id, comment_writer, comment_password, comment_content } = req.body;
    const comment = new Comment({
        post_id: post_id,
        writer: comment_writer,
        password: comment_password,
        content: comment_content
    });
    try {
        await comment.save();
        res.json({ msg: '성공' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: '에러 발생' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const comments = await Comment.find({post_id:req.params.id});
        res.json(comments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: '에러 발생' });
    }
});

router.put('/', async (req, res) => {
    const { comment_id, comment_writer, comment_password, comment_content } = req.body;
    try {
        await Comment.updateOne({_id: comment_id}, {$set: {'writer':comment_writer, 'password':comment_password, 'content':comment_content}});
        res.json({'msg' : '수정 완료'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: '에러 발생' });
    }
});

router.delete('/', async (req, res) => {
    const { comment_id } = req.body;
    try {
        await Comment.deleteOne({_id: comment_id});
        res.json({'msg' : '삭제 완료'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: '에러 발생' });
    }
});


module.exports = router;