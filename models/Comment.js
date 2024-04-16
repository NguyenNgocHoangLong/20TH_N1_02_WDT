const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    comicId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Comic'
    },
    text: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Comment', commentSchema);
