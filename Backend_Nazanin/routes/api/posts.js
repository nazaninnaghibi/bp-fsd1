const express = require('express');
const router = express.Router();
const { getPosts, createPost, updatePost, deletePost } = require('../../controllers/posts');
const auth = require('../../middleware/auth');

router.get('/', getPosts);
router.post('/', auth, createPost);
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);


module.exports = router;

