const express = require('express');
const router = express.Router();

const { 
    getAllComments,
    getComment,
    createComment,
    updateComment,
    deleteComment
} = require('../controllers/commentController.js');

router.get('/', getAllComments);
router.get('/:id', getComment);
router.post('/', createComment);
router.put('/', updateComment);
router.delete('/', deleteComment);

module.exports = router;