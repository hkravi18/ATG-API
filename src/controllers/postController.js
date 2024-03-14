//models
const Post = require('../models/postModel.js');
const Comment = require('../models/commentModel.js');
 
// @desc     Get All Posts 
// route     GET /api/posts
// @access   Public
const getAllPosts = async(req, res) => {
    try {
        const postsList = await Post.find({});
        // console.log("posts : ", postsList);

        return res.status(200).json({
            ok: true, 
            message: "Posts fetched successfully",
            data: {
                posts: postsList
            }
        });
    } catch (err) {
        console.error(`ERROR (get-all-posts): ${err.message}`);

        return res.status(500).json({
            ok: false,
            error: "Posts fetching failed.",
            data: {}
        })
    }
};

// @desc     Get Single Posts 
// route     GET /api/posts/:id
// @access   Public
const getPost = async(req, res) => {
    try {
        const { id } = req.params;
        
        if (!id) {
            console.log("ERROR (get-single-post): post id is required");
            return res.status(404).json({
                ok: false,
                data: {},
                error: "Post id is required",
            }); 
        }
        
        const post = await Post.findById(id);
        // console.log("Fetched Post : ", post);

        if (!post) {
            console.log("ERROR (get-single-post): post does not exists");
            return res.status(404).json({
                ok: false,
                data: {},
                error: "Post with given id does not exist",
            }); 
        }

        return res.status(200).json({
            ok: true, 
            message: "Post fetched successfully",
            data: {
                posts: post
            }
        });
    } catch (err) {
        console.error(`ERROR (get-single-post): ${err.message}`);

        return res.status(500).json({
            ok: false,
            error: "Post fetching failed.",
            data: {}
        })
    }
};


// @desc     Get User Posts 
// route     POST /api/posts/user
// @access   Public
const getUserPosts = async(req, res) => {
    try {
        const { _id: userId } = req.body;
        
        if (!userId) {
            console.log("ERROR (get-user-posts): userId is required");
            return res.status(404).json({
                ok: false,
                data: {},
                error: "User ID is required",
            }); 
        }
        
        const userPosts = await Post.find({
            createdBy: userId
        });
        // console.log("Fetched User Posts : ", userPosts);

        return res.status(200).json({
            ok: true, 
            message: "User's Posts fetched successfully.",
            data: {
                posts: userPosts
            }
        });
    } catch (err) {
        console.error(`ERROR (get-user-posts): ${err.message}`);

        return res.status(500).json({
            ok: false,
            error: "User's Posts fetching failed.",
            data: {}
        })
    }
};


// @desc     Create Post 
// route     POST /api/posts
// @access   Private
const createPost = async(req, res) => {
    try {
        const { _id: userId } = req.user; 
        const { content } = req.body;

        if (!content) {
            console.log("ERROR (create-post): post content is required");
            return res.status(400).json({
                ok: false,
                data: {},
                error: "Post content is required",
            }); 
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
                posts: createdPost
            }
        });
    } catch (err) {
        console.error(`ERROR (create-post): ${err.message}`);

        return res.status(500).json({
            ok: false,
            error: "Post creation failed.",
            data: {}
        })
    }
};


// @desc     Update Post 
// route     PUT /api/posts
// @access   Private
const updatePost = async(req, res) => {
    try {
        const { _id: userId } = req.user; 
        const { id: postId, content: newContent } = req.body;

        if (!postId) {
            console.log("ERROR (update-post): id is required");
            return res.status(404).json({
                ok: false,
                data: {},
                error: "Post id is required",
            }); 
        }
 
        const post = await Post.findById(postId);
    
        //user is not allowed to update this post (as the post is not created by the user)
        if (!post.createdBy.equals(userId)) {
            console.log("ERROR (update-post): User not authorized to update this post");
            return res.status(404).json({
                ok: false,
                data: {},
                error: "User not authorized to update this post",
            }); 
        }

        //updating the post
        post.content = newContent; 
        post.save();

        // console.log("updated post : ", post);

        return res.status(200).json({
            ok: true, 
            message: "Post updated successfully",
            data: {
                posts: post
            }
        });
    } catch (err) {
        console.error(`ERROR (update-post): ${err.message}`);

        return res.status(500).json({
            ok: false,
            error: "Post updating failed.",
            data: {}
        })
    }
};

// @desc     Delete Post 
// route     DELETE /api/posts/:id
// @access   Private
const deletePost = async(req, res) => {
    try {
        const { _id: userId } = req.user;
        const { id } = req.params;

        const post = await Post.findById(id);
        
        let errMsg = "", err = false;
        
        if (!post) {
            errMsg = "Post not found",
            err = true;
        } 

        if (post && !post.createdBy.equals(userId)) {
            errMsg = "User not authorized to delete this post";
            err = true;
        }

        if (err) {
            return res.status(400).json({
                ok: false,
                error: errMsg,
                data: {}
            });
        }

        
        const deletedPost = await Post.findByIdAndDelete(id);
        // console.log("deletedPosts : ", deletedPost);
        
        if (!deletedPost) {
            console.log("ERROR (delete-post): post does not exists");
            return res.status(404).json({
                ok: false,
                data: {},
                error: "Post with given id does not exist",
            }); 
        }

        //deleting all the comments for this post
        await Comment.deleteMany({ postId: id });

        
        return res.status(200).json({
            ok: true, 
            message: "Post deleted successfully",
            data: {
                posts: deletedPost
            }
        });
    } catch (err) {
        console.error(`ERROR (delete-posts): ${err.message}`);

        return res.status(500).json({
            ok: false,
            error: "Posts deletion failed.",
            data: {}
        })
    }
};


module.exports = {
    getPost,
    getAllPosts,
    getUserPosts,
    createPost,
    updatePost,
    deletePost
};