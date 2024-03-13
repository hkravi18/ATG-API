const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema({
    createdBy: { 
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    content: { 
        type: String, 
        required: true 
    },
    likes: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'User' 
    }], 
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;