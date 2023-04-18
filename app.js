const express = require('express');
const app = express();

const port = 3000;


const indexRouter = require('./routes');
const editorRouter = require('./routes/posts');
const contentRouter = require('./routes/comments');

app.use('/', indexRouter);
app.use('/posts', editorRouter);
app.use('/comments', contentRouter);

app.listen(port, () => {
    console.log(port, '포트로 서버가 열렸어요!');
});