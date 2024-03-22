const mongoose = require("mongoose");
const { Schema } = mongoose;

//data encryption and decryption
const { encrypt, decrypt } = require("../utils/handleEncryption.js");

const commentSchema = new Schema({
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  postId: {
    type: Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

//encrypting the content before saving
commentSchema.pre("save", function (next) {
  if (this.content) {
    this.content = encrypt(this.content);
  }
  next();
});

//mongoose method for decrypting the content
commentSchema.methods.decryptContent = function () {
  if (this.content) {
    return decrypt(this.content);
  }
  return null;
};

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
