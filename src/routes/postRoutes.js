const express = require('express');
const router = express.Router();

const { 
    getAllPosts,
    getPost,
    getUserPosts,
    createPost,
    updatePost,
    deletePost 
} = require('../controllers/postController.js');

const authMiddleware = require('../middleware/authMiddleware.js');

router.get('/', getAllPosts);
router.get('/:id', getPost);
router.post('/user', getUserPosts);

router.use(authMiddleware);

//protected routes
router.post('/', createPost);
router.put('/', updatePost);
router.delete('/:id', deletePost);

module.exports = router;