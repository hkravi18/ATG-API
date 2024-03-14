//models
// const Post = require('../models/postModel.js');
const Comment = require('../models/commentModel.js');
 
// @desc     Get All Comments For A Post 
// route     GET /api/comments
// @access   Public
const getAllComments = async(req, res) => {
    try {
        const { id: postId } = req.params;

        const commentsList = await Comment.find({
            post: postId
        });

        console.log("Comments : ", commentsList);

        return res.status(200).json({
            ok: true, 
            message: "Comments fetched successfully",
            data: {
                comments: commentsList
            }
        });
    } catch (err) {
        console.error(`ERROR (get-all-comments): ${err.message}`);

        return res.status(500).json({
            ok: false,
            error: "Comments fetching failed, Please try again later.",
            data: {}
        })
    }
};

// @desc     Get Single Comment 
// route     GET /api/comments/:id
// @access   Public
const getComment = async(req, res) => {
    try {
        const { id: commentId } = req.params;
        
        if (!commentId) {
            console.log("ERROR (get-single-comment): id is required");
            return res.status(404).json({
                ok: false,
                data: {},
                error: "Comment id is required",
            }); 
        }
        
        const comment = await Comment.findById(commentId);
        console.log("Fetched Comment : ", comment);

        if (!comment) {
            console.log("ERROR (get-single-comment): comment does not exists");
            return res.status(404).json({
                ok: false,
                data: {},
                error: "Comment with given id does not exist",
            }); 
        }

        return res.status(200).json({
            ok: true, 
            message: "Comment fetched successfully",
            data: {
                comments: comment
            }
        });
    } catch (err) {
        console.error(`ERROR (get-single-comment): ${err.message}`);

        return res.status(500).json({
            ok: false,
            error: "Comment fetching failed, Please try again later.",
            data: {}
        })
    }
};

// @desc     Get User's Comments and its associated Posts  
// route     GET /api/comments/user
// @access   Private
const getUserComment = async(req, res) => {
    try {
        const { _id: userId } = req.user;

        const commentsAndPostsList = await Comment.find({
            createdBy: userId,
        }).populate("postId");

        // console.log("commentsAndPostsList : ", commentsAndPostsList);

        return res.status(200).json({
            ok: true, 
            message: "Comments fetched successfully",
            data: {
                commentsAndPostsList: commentsAndPostsList
            }
        });
    } catch (err) {
        console.error(`ERROR (get-user-all-comments-posts): ${err.message}`);

        return res.status(500).json({
            ok: false,
            error: "Comments and Posts fetching failed, Please try again later.",
            data: {}
        })
    }
};


// @desc     Create Comment 
// route     POST /api/comments
// @access   Private
const createComment = async(req, res) => {
    try {
        const { _id: userId } = req.user; 
        const { content, postId } = req.body;

        if (!content || !postId) {
            let errMsg = "";
            
            if (!content) errMsg = "Content is required";
            if (!postId) errMsg = "Post ID is required";

            console.log(`ERROR (create-comment): ${errMsg}`);
            return res.status(404).json({
                ok: false,
                data: {},
                error: errMsg,
            }); 
        }
 
        const createdComment = await Comment.create({
            createdBy: userId,
            content,
            postId
        });

        console.log("created comment : ", createdComment);

        return res.status(200).json({
            ok: true, 
            message: "Comment created successfully",
            data: {
                comments: createdComment
            }
        });
    } catch (err) {
        console.error(`ERROR (create-comment): ${err.message}`);

        return res.status(500).json({
            ok: false,
            error: "Comment creation failed, Please try again later.",
            data: {}
        })
    }
};


// @desc     Update Comment 
// route     PUT /api/comments
// @access   Private
const updateComment = async(req, res) => {
    try {
        const { _id: userId } = req.user; 
        const { id: commentId, content } = req.body;

        if (!commentId) {
            console.log("ERROR (update-comment): comment id is required");
            return res.status(400).json({
                ok: false,
                data: {},
                error: "Comment id is required",
            }); 
        }
 
        const comment = await Comment.findById(commentId);
        
        //user is not allowed to update this post (as the post is not created by the user)
        if (!comment.createdBy.equals(userId)) {
            console.log("ERROR (update-comment): User not authorized to update this comment");
            return res.status(401).json({
                ok: false,
                data: {},
                error: "User not authorized to update this comment",
            }); 
        }

        //updating the post
        comment.content = content; 
        comment.save();

        console.log("updated comment : ", comment);

        return res.status(200).json({
            ok: true, 
            message: "Comment updated successfully",
            data: {
                comments: comment
            }
        });
    } catch (err) {
        console.error(`ERROR (update-comment): ${err.message}`);

        return res.status(500).json({
            ok: false,
            error: "Comment updating failed, Please try again later.",
            data: {}
        })
    }
};

// @desc     Delete Comment 
// route     DELETE /api/comments/:id
// @access   Private
const deleteComment = async(req, res) => {
    try {
        const { _id: userId } = req.user;
        const { id: commentId } = req.params;
        
        //TODO: Check the user email to the comment email
        const comment = await Comment.findById(commentId);
        
        let errMsg = "", err = false;
        
        if (!comment) {
            errMsg = "Comment not found",
            err = true;
        } 

        if (comment && !comment.createdBy.equals(userId)) {
            errMsg = "User not authorized to delete this comment";
            err = true;
        }

        if (err) {
            return res.status(400).json({
                ok: false,
                error: errMsg,
                data: {}
            });
        }

        const deletedComment = await Comment.findByIdAndDelete(commentId);
        console.log("deletedComment : ", deletedComment);
        
        if (!deletedComment) {
            console.log("ERROR (delete-comment): comment does not exists");
            return res.status(404).json({
                ok: false,
                data: {},
                error: "Comment with given id does not exist",
            }); 
        }

        return res.status(200).json({
            ok: true, 
            message: "Comment deleted successfully",
            data: {
                comments: deletedComment
            }
        });
    } catch (err) {
        console.error(`ERROR (delete-comments): ${err.message}`);

        return res.status(500).json({
            ok: false,
            error: "Comments deleting failed, Please try again later.",
            data: {}
        })
    }
};


module.exports = {
    getAllComments,
    getComment,
    getUserComment,
    createComment,
    updateComment,
    deleteComment
};