//models
const Post = require("../models/postModel.js");

//decryption util function
const decryptContent = require("../utils/decryptContent.js");

// @desc     Like Post
// route     POST /api/post/like
// @access   Private
const likePost = async (req, res) => {
  try {
    const { _id: userId } = req.user;
    const { id: postId } = req.params;

    if (!postId) {
      console.log("ERROR (like-post): Post Id is required");
      return res.status(400).json({
        ok: false,
        data: {},
        error: "Post Id is required",
      });
    }

    const post = await Post.findById(postId);

    if (!post) {
      console.log("ERROR (like-post): Post not found");
      return res.status(404).json({
        ok: false,
        data: {},
        error: "Post with given id does not exist",
      });
    }

    if (post.likes.includes(userId)) {
      console.log("ERROR (like-post): Like already exists");
      return res.status(400).json({
        ok: false,
        data: {},
        error: "Post is already liked by user",
      });
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

    return res.status(500).json({
      ok: false,
      error: "Adding Like to Post failed.",
      data: {},
    });
  }
};

// @desc     Get All Liked Posts
// route     GET /api/like/user
// @access   Private
const getAllLikePosts = async (req, res) => {
  try {
    const { _id: userId } = req.user;

    const likedPosts = await Post.find({
      likes: userId,
    });

    // console.log("decrypt : ", decryptContent(likedPosts));

    return res.status(200).json({
      ok: true,
      messages: "Liked Posts fetched Successfully",
      data: decryptContent(likedPosts),
    });
  } catch (err) {
    console.error(`ERROR (user-like-post): ${err.message}`);

    return res.status(500).json({
      ok: false,
      error: "Liked Posts fetching failed.",
      data: {},
    });
  }
};

module.exports = {
  likePost,
  getAllLikePosts,
};
