//models
const Post = require("../models/postModel.js");

//decryption util function
const decryptContent = require("../utils/decryptContent.js");

//utils
const CustomError = require("../utils/customError.js");

// @desc     Like Post
// route     POST /api/post/like
// @access   Private
const likePost = async (req, res, next) => {
  try {
    const { _id: userId } = req.user;
    const { id: postId } = req.params;

    if (!postId) {
      const error = new CustomError("Post Id is required.", 400, "like-post");
      next(error);
      return;
    }

    const post = await Post.findById(postId);

    if (!post) {
      console.log("ERROR (like-post): Post not found");
      const error = new CustomError(
        "Post with given id does not exist.",
        404,
        "like-post"
      );
      next(error);
      return;
    }

    if (post.likes.includes(userId)) {
      const error = new CustomError(
        "Post is already liked by user.",
        400,
        "like-post"
      );
      next(error);
      return;
    }

    post.likes.push(userId);
    await post.save();

    return res.status(200).json({
      ok: true,
      messages: "Like added to post Successfully",
      data: {},
    });
  } catch (err) {
    console.error(`ERROR (like-post): ${err.message}`);
    const error = new CustomError(
      "Adding Like to Post failed..",
      500,
      "like-post"
    );
    next(error);
    return;
  }
};

// @desc     Get All Liked Posts
// route     GET /api/like/user
// @access   Private
const getAllLikePosts = async (req, res, next) => {
  try {
    const { _id: userId } = req.user;

    const likedPosts = await Post.find({
      likes: userId,
    });

    return res.status(200).json({
      ok: true,
      messages: "Liked Posts fetched Successfully",
      data: decryptContent(likedPosts),
    });
  } catch (err) {
    console.error(`ERROR (user-like-post): ${err.message}`);
    const error = new CustomError(
      "Liked Posts fetching failed.",
      500,
      "user-like-post"
    );
    next(error);
    return;
  }
};

module.exports = {
  likePost,
  getAllLikePosts,
};
