const mongoose = require('../db');

const comicSchema = new mongoose.Schema({
    title: String,
    description: String,
    cover_image_url: String,
    views: Number,
    likes: Number,
    watches: Number,
    readed: Number,
    genres: [String]
});

const Comic = mongoose.model('Comic', comicSchema);
module.exports = Comic;

