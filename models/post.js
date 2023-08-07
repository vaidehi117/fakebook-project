const mongoose = require('mongoose');

const likesSchema = mongoose.Schema({
    username: String,
    //One user has many likes, referencing because we have user model, so we can get the users information when we need it
    userId: {
        type: mongoose.Schema.Types.ObjectId
    }
})

const CommentsSchema = mongoose.Schema({
    username: String,
    //One post has many comments, referencing because we have user model, so we can get the users information when we need it
    comments: String, 
})

const postSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    photoUrl: String,
    caption: String,
    //One Post has many likes, we are using embedding, because the likes will always be tied to the post, so no reason
    //To make a likes model
    likes: [likesSchema],
    //One post has many comments,embedding, because the comments will always be tied to the post
    //To make a comments model
    comments: [CommentsSchema]
})

module.exports = mongoose.model('Post', postSchema);