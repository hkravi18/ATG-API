const express = require("express");
const router = express.Router();

const {
  getAllComments,
  getComment,
  getUserComment,
  createComment,
  updateComment,
  deleteComment,
} = require("../controllers/commentController.js");

const authMiddleware = require("../middleware/authMiddleware.js");

router.get("/", getAllComments);
router.get("/user", authMiddleware, getUserComment);
router.get("/:id", getComment);

router.use(authMiddleware);

router.post("/", createComment);
router.put("/", updateComment);
router.delete("/:id", deleteComment);

module.exports = router;
