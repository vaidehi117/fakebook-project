const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    },
    photoUrl: String,
    caption: String,
})

module.exports = mongoose.model('Post', postSchema);