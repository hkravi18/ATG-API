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
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment',
    }],
    likes: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'User' 
    }]
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;