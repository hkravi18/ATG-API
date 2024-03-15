const express = require("express");
const router = express.Router();

const {
  likePost,
  getAllLikePosts,
} = require("../controllers/likeController.js");
const authMiddleware = require("../middleware/authMiddleware.js");

router.use(authMiddleware);

router.get("/post/user", getAllLikePosts);
router.get("/post/:id", likePost);

module.exports = router;
