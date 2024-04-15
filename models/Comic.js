const mongoose = require('../db');

const comicSchema = new mongoose.Schema({
    title: String,
    description: String,
    image: String,
    views: Number
});

const Comic = mongoose.model('Comic', comicSchema);

module.exports = Comic;
