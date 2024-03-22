//models
const Comment = require("../models/commentModel.js");

//decryption util function
const decryptContent = require("../utils/decryptContent.js");

//utils
const CustomError = require("../utils/customError.js");

// @desc     Get All Comments For A Post
// route     GET /api/comments
// @access   Public
const getAllComments = async (req, res, next) => {
  try {
    const { id: postId } = req.params;

    const commentsList = await Comment.find({
      post: postId,
    });

    // console.log("Comments : ", commentsList);

    return res.status(200).json({
      ok: true,
      message: "Comments fetched successfully",
      data: {
        comments: decryptContent(commentsList),
      },
    });
  } catch (err) {
    console.error(`ERROR (get-all-comments): ${err.message}`);

    const error = new CustomError(
      "Comments fetching failed.",
      500,
      "get-all-comments"
    );
    next(error);
    return;
  }
};

// @desc     Get Single Comment
// route     GET /api/comments/:id
// @access   Public
const getComment = async (req, res, next) => {
  try {
    const { id: commentId } = req.params;

    if (!commentId) {
      const error = new CustomError(
        "Comment id is required",
        404,
        "get-single-comment"
      );
      next(error);
      return;
    }

    const comment = await Comment.findById(commentId);
    // console.log("Fetched Comment : ", comment);

    if (!comment) {
      const error = new CustomError(
        "Comment with given id does not exist",
        404,
        "get-single-comment"
      );
      next(error);
      return;
    }

    return res.status(200).json({
      ok: true,
      message: "Comment fetched successfully",
      data: {
        comments: decryptContent(comment),
      },
    });
  } catch (err) {
    console.error(`ERROR (get-single-comment): ${err.message}`);
    const error = new CustomError(
      "Comment fetching failed",
      500,
      "get-single-comment"
    );
    next(error);
    return;
  }
};

// @desc     Get User"s Comments and its associated Posts
// route     GET /api/comments/user
// @access   Private
const getUserComment = async (req, res, next) => {
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
        commentsAndPostsList: decryptContent(commentsAndPostsList),
      },
    });
  } catch (err) {
    console.error(`ERROR (get-user-all-comments-posts): ${err.message}`);

    const error = new CustomError(
      "Comments and Posts fetching failed",
      404,
      "get-user-all-comments-posts"
    );
    next(error);
    return;
  }
};

// @desc     Create Comment
// route     POST /api/comments
// @access   Private
const createComment = async (req, res, next) => {
  try {
    const { _id: userId } = req.user;
    const { content, postId } = req.body;

    if (!content || !postId) {
      let errMsg = "";

      if (!content) {
        errMsg = "Content is required";
      }
      if (!postId) {
        errMsg = "Post ID is required";
      }

      const error = new CustomError(errMsg, 400, "create-comment");
      next(error);
      return;
    }

    const createdComment = await Comment.create({
      createdBy: userId,
      content,
      postId,
    });

    // console.log("created comment : ", createdComment);

    return res.status(200).json({
      ok: true,
      message: "Comment created successfully",
      data: {
        comments: decryptContent(createdComment),
      },
    });
  } catch (err) {
    console.error(`ERROR (create-comment): ${err.message}`);
    const error = new CustomError(
      "Comment creation failed.",
      500,
      "create-comment"
    );
    next(error);
    return;
  }
};

// @desc     Update Comment
// route     PUT /api/comments
// @access   Private
const updateComment = async (req, res, next) => {
  try {
    const { _id: userId } = req.user;
    const { id: commentId, content } = req.body;

    if (!commentId) {
      const error = new CustomError(
        "Comment id is required",
        400,
        "update-comment"
      );
      next(error);
      return;
    }

    const comment = await Comment.findById(commentId);

    if (!comment) {
      const error = new CustomError(
        "Comment with given id does not exists",
        404,
        "update-comment"
      );
      next(error);
      return;
    }

    //user is not allowed to update this post (as the post is not created by the user)
    if (!comment.createdBy.equals(userId)) {
      const error = new CustomError(
        "User not authorized to update this comment",
        401,
        "update-comment"
      );
      next(error);
      return;
    }

    //updating the post
    comment.content = content;
    await comment.save();

    // console.log("updated comment : ", comment);

    return res.status(200).json({
      ok: true,
      message: "Comment updated successfully",
      data: {
        comments: decryptContent(comment),
      },
    });
  } catch (err) {
    console.error(`ERROR (update-comment): ${err.message}`);
    const error = new CustomError(
      "Comment updating failed.",
      500,
      "update-comment"
    );
    next(error);
    return;
  }
};

// @desc     Delete Comment
// route     DELETE /api/comments/:id
// @access   Private
const deleteComment = async (req, res, next) => {
  try {
    const { _id: userId } = req.user;
    const { id: commentId } = req.params;

    //TODO: Check the user email to the comment email
    const comment = await Comment.findById(commentId);

    let errMsg = "",
      err = false;

    if (!comment) {
      (errMsg = "Comment not found"), (err = true);
    }

    if (comment && !comment.createdBy.equals(userId)) {
      errMsg = "User not authorized to delete this comment";
      err = true;
    }

    if (err) {
      const error = new CustomError(errMsg, 400, "delete-comment");
      next(error);
      return;
    }

    const deletedComment = await Comment.findByIdAndDelete(commentId);
    // console.log("deletedComment : ", deletedComment);

    if (!deletedComment) {
      const error = new CustomError(
        "Comment with given id does not exist",
        404,
        "delete-comment"
      );
      next(error);
      return;
    }

    return res.status(200).json({
      ok: true,
      message: "Comment deleted successfully",
      data: {
        comments: decryptContent(deletedComment),
      },
    });
  } catch (err) {
    console.error(`ERROR (delete-comments): ${err.message}`);
    const error = new CustomError(
      "Comments deletion failed.",
      500,
      "delete-comment"
    );
    next(error);
    return;
  }
};

module.exports = {
  getAllComments,
  getComment,
  getUserComment,
  createComment,
  updateComment,
  deleteComment,
};
