//models
const Post = require("../models/postModel.js");
const Comment = require("../models/commentModel.js");

//decryption util function
const decryptContent = require("../utils/decryptContent.js");

//utils
const CustomError = require("../utils/customError.js");

// @desc     Get All Posts
// route     GET /api/posts
// @access   Public
const getAllPosts = async (req, res, next) => {
  try {
    const postsList = await Post.find({});

    return res.status(200).json({
      ok: true,
      message: "Posts fetched successfully",
      data: {
        posts: decryptContent(postsList),
      },
    });
  } catch (err) {
    console.error(`ERROR (get-all-posts): ${err.message}`);
    const error = new CustomError(
      "Posts fetching failed.",
      500,
      "get-all-posts"
    );
    next(error);
    return;
  }
};

// @desc     Get Single Posts
// route     GET /api/posts/:id
// @access   Public
const getPost = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      const error = new CustomError(
        "Post id is required",
        400,
        "get-single-post"
      );
      next(error);
      return;
    }

    const post = await Post.findById(id);
    // console.log("Fetched Post : ", post);

    if (!post) {
      const error = new CustomError(
        "Post with given id does not exist",
        404,
        "get-single-post"
      );
      next(error);
      return;
    }

    return res.status(200).json({
      ok: true,
      message: "Post fetched successfully",
      data: {
        posts: decryptContent(post),
      },
    });
  } catch (err) {
    console.error(`ERROR (get-single-post): ${err.message}`);
    const error = new CustomError(
      "Post fetching failed.",
      500,
      "get-single-post"
    );
    next(error);
    return;
  }
};

// @desc     Get User Posts
// route     POST /api/posts/user
// @access   Public
const getUserPosts = async (req, res, next) => {
  try {
    const { _id: userId } = req.body;

    if (!userId) {
      const error = new CustomError(
        "User ID is required.",
        404,
        "get-user-posts"
      );
      next(error);
      return;
    }

    const userPosts = await Post.find({
      createdBy: userId,
    });
    // console.log("Fetched User Posts : ", userPosts);

    return res.status(200).json({
      ok: true,
      message: "User's Posts fetched successfully.",
      data: {
        posts: decryptContent(userPosts),
      },
    });
  } catch (err) {
    console.error(`ERROR (get-user-posts): ${err.message}`);
    const error = new CustomError(
      "User's Posts fetching failed.",
      500,
      "get-user-posts"
    );
    next(error);
    return;
  }
};

// @desc     Create Post
// route     POST /api/posts
// @access   Private
const createPost = async (req, res, next) => {
  try {
    const { _id: userId } = req.user;
    const { content } = req.body;

    if (!content) {
      const error = new CustomError(
        "Post content is required.",
        400,
        "create-post"
      );
      next(error);
      return;
    }

    const createdPost = await Post.create({
      createdBy: userId,
      content,
      likes: [],
    });

    // console.log("created post : ", createdPost);

    return res.status(200).json({
      ok: true,
      message: "Post created successfully",
      data: {
        posts: decryptContent(createdPost),
      },
    });
  } catch (err) {
    console.error(`ERROR (create-post): ${err.message}`);
    const error = new CustomError("Post creation failed.", 500, "create-post");
    next(error);
    return;
  }
};

// @desc     Update Post
// route     PUT /api/posts
// @access   Private
const updatePost = async (req, res, next) => {
  try {
    const { _id: userId } = req.user;
    const { id: postId, content: newContent } = req.body;

    if (!postId) {
      const error = new CustomError("Post id is required.", 400, "update-post");
      next(error);
      return;
    }

    const post = await Post.findById(postId);

    if (!post) {
      const error = new CustomError(
        "Post with given id does not exist.",
        404,
        "update-post"
      );
      next(error);
      return;
    }

    //user is not allowed to update this post (as the post is not created by the user)
    if (post && !post.createdBy.equals(userId)) {
      const error = new CustomError(
        "User not authorized to update this post.",
        401,
        "update-post"
      );
      next(error);
      return;
    }

    //updating the post
    post.content = newContent;
    await post.save();

    // console.log("updated post : ", post);

    return res.status(200).json({
      ok: true,
      message: "Post updated successfully",
      data: {
        posts: decryptContent(post),
      },
    });
  } catch (err) {
    console.error(`ERROR (update-post): ${err.message}`);
    const error = new CustomError("Post updating failed.", 500, "update-post");
    next(error);
    return;
  }
};

// @desc     Delete Post
// route     DELETE /api/posts/:id
// @access   Private
const deletePost = async (req, res, next) => {
  try {
    const { _id: userId } = req.user;
    const { id } = req.params;

    const post = await Post.findById(id);

    let errMsg = "",
      err = false;

    if (!post) {
      (errMsg = "Post not found"), (err = true);
    }

    if (post && !post.createdBy.equals(userId)) {
      errMsg = "User not authorized to delete this post";
      err = true;
    }

    if (err) {
      const error = new CustomError(errMsg, 400, "delete-post");
      next(error);
      return;
    }

    const deletedPost = await Post.findByIdAndDelete(id);
    // console.log("deletedPosts : ", deletedPost);

    if (!deletedPost) {
      const error = new CustomError(
        "Post with given id does not exist",
        404,
        "delete-post"
      );
      next(error);
      return;
    }

    //deleting all the comments for this post
    await Comment.deleteMany({ postId: id });

    return res.status(200).json({
      ok: true,
      message: "Post deleted successfully",
      data: {
        posts: decryptContent(deletedPost),
      },
    });
  } catch (err) {
    console.error(`ERROR (delete-posts): ${err.message}`);
    const error = new CustomError("Posts deletion failed.", 500, "delete-post");
    next(error);
    return;
  }
};

module.exports = {
  getPost,
  getAllPosts,
  getUserPosts,
  createPost,
  updatePost,
  deletePost,
};
