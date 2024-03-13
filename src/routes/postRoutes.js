const express = require('express');
const router = express.Router();

const { 
    getAllPosts,
    getPost,
    createPost,
    updatePost,
    deletePost 
} = require('../controllers/postController.js');

router.get('/', getAllPosts);
router.get('/:id', getPost);
router.post('/', createPost);
router.put('/', updatePost);
router.delete('/', deletePost);

module.exports = router;