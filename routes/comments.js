const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const router = express.Router();
router.use(bodyParser.json())
router.use(bodyParser.raw());
router.use(bodyParser.text());
router.use(bodyParser.urlencoded({ extended: true }));
const Comment = require('../schemas/comment');

router.post('/:postId/comments', async (req, res) => {
    const postId = req.params.postId;
    const { comment_writer, comment_password, comment_content } = req.body;
    const comment = new Comment({
        post_id: postId,
        writer: comment_writer,
        password: comment_password,
        content: comment_content
    });
    try {
        await comment.save();
        res.json({ msg: '댓글을 생성하였습니다.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: '에러 발생' });
    }
});

router.get('/:postId/comments', async (req, res) => {
    console.log(req.params);
    const postId = req.params.postId;
    console.log(postId);
    try {
        const comments = await Comment.find({post_id:postId});
        res.json({"data" : comments});
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: '에러 발생' });
    }
});

router.put('/:postId/comments/:commentId', async (req, res) => {
    const commentId = req.params.commentId;
    const { comment_writer, comment_password, comment_content } = req.body;
    try {
        await Comment.updateOne({_id: commentId}, {$set: {'writer':comment_writer, 'password':comment_password, 'content':comment_content}});
        res.json({'msg' : '댓글을 수정하였습니다.'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: '에러 발생' });
    }
});

router.delete('/:postId/comments/:commentId', async (req, res) => {
    const commentId = req.params.commentId;
    try {
        await Comment.deleteOne({_id: commentId});
        res.json({'msg' : '댓글을 삭제하였습니다.'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: '에러 발생' });
    }
});


module.exports = router;