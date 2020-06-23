const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    content : {
        type: String,
        required: [true, 'Post must have content']
    },
    upVotes : {
        type: Number,
        default: 0
        // embed the users who upvoted and same in downvotes
    },
    downVotes : {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'A post must belong to a user']
    }
});



postSchema.pre(/^find/, function(next) {
    this.populate({
        path: 'user',
        select: 'username _id'
    })
    next();
})

const Post = mongoose.model('Post', postSchema)

module.exports = Post;