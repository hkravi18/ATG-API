const mongoose = require("mongoose");
const { Schema } = mongoose;

//data encryption and decryption
const { encrypt, decrypt } = require("../utils/handleEncryption.js");

const postSchema = new Schema({
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

//encrypting the content before saving
postSchema.pre("save", function (next) {
  if (this.content) {
    this.content = encrypt(this.content);
    // console.log("this.content : ", this.content);
    // this.content = JSON.stringify(encryptedContent);
  }
  next();
});

//mongoose method for decrypting the content
postSchema.methods.decryptContent = function () {
  if (this.content) {
    return decrypt(this.content);
  }
  return null;
};

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
