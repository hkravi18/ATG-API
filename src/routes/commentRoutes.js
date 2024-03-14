const express = require('express');
const router = express.Router();

const { 
    getAllComments,
    getComment,
    getUserComment,
    createComment,
    updateComment,
    deleteComment
} = require('../controllers/commentController.js');

const authMiddleware = require('../middleware/authMiddleware.js');

router.get('/', getAllComments);
router.get('/:id', getComment);

router.use(authMiddleware);

router.post('/', createComment);
router.post('/user', getUserComment);
router.put('/', updateComment);
router.delete('/', deleteComment);

module.exports = router;