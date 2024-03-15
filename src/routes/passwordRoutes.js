const express = require("express");
const router = express.Router();

const {
  forgetPassword,
  resetPassword,
} = require("../controllers/passwordController.js");

router.post("/forget", forgetPassword);
router.post("/reset", resetPassword);

module.exports = router;
