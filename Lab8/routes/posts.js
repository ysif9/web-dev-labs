const express = require('express');
const router = express.Router();

const posts = []
const comments = []

router.post('/', function (req, res) {
    const post = {
        id: posts.length,
        title: req.body["title"],
        content: req.body["content"],
    }
    console.log(`Adding this new post  ${JSON.stringify(post)}`);
    posts.push(post);
    console.log(`Posts: ${JSON.stringify(posts)}`);
    res.status(201).json(post);
})

router.get('/', function (req, res) {
    console.log(`Getting all posts from posts`);
    res.status(200).json(posts);
})

router.get('/:id', function (req, res) {
    const id = parseInt(req.params.id);
    if (!posts[id]) {
        return res.status(404).json({error: 'Post not found'});
    }
    res.status(200).json(posts[id]);
})

router.put('/:id', function (req, res) {
    const id = parseInt(req.params.id);
    if (!posts[id]) {
        return res.status(404).json({ error: 'Post not found' });
    }
    const updatedPost = {
        id: id,
        title: req.body.title,
        content: req.body.content,
    };
    posts[id] = updatedPost;
    res.status(200).json(updatedPost);
})

router.delete('/:id', function (req, res) {
    const id = parseInt(req.params.id);
    if (!posts[id]) {
        return res.status(404).json({ error: 'Post not found' });
    }
    const deletedPost = posts[id];
    posts[id] = null;

    res.status(200).json(deletedPost);
})

router.post('/:id/comments', function (req, res) {
    const id = parseInt(req.params.id);

    if (!posts[id]) {
        return res.status(404).json({ error: 'Post not found' });
    }
    const comment = {
        comment: req.body.content,
    }
    if (!comments[id]) {
        comments[id] = [];
    }
    comments[id].push(comment);
    res.status(200).json(comment);
})

router.get('/:id/comments/', function (req, res) {
    const id = parseInt(req.params.id);
    if (!posts[id]) {
        return res.status(404).json({ error: 'Post not found' });
    }
    const comment = comments[id];
    res.status(200).json(comment);
})

module.exports = router;