const express = require('express');
const app = express();

const port = 3000;


const indexRouter = require('./routes');
const postsRouter = require('./routes/posts');
const commentsRouter = require('./routes/comments');

const connect = require('./schemas');
connect();

app.use('/', indexRouter);
app.use('/posts', [postsRouter, commentsRouter]);

app.listen(port, () => {
    console.log(port, '포트로 서버가 열렸어요!');
});